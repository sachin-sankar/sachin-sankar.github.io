---
title: "Async Adventure"
description: "A 15x Speedup Journey from Synchronous Bottlenecks to Asynchronous Efficiency"
pubDate: 2025-03-20
tags: ["devlog"]
---
# Introduction

*The Road to a Faster Swiftshadow*

When I first built **Swiftshadow**, a simple proxy rotator for handling free proxies, it worked well—just not fast enough. Proxy validation was **synchronous**, meaning each proxy was checked **one at a time**. For small lists, this wasn’t a huge issue, but for users managing hundreds of proxies, it quickly became a bottleneck. A full validation run could take **over 160 seconds**, which was far from ideal.

I started looking into ways to improve performance. After exploring different approaches, I found that switching to **asynchronous processing** made the biggest difference. By rewriting the core validation logic with `aiohttp` and `asyncio`, Swiftshadow could now validate proxies **in parallel**, reducing the overall runtime to just **10 seconds**—a **15x improvement**.

This article walks through that optimization journey: what the initial challenges were, how I approached the problem, and what ultimately worked. Along the way, I’ll also highlight a few key decisions that helped shape the final solution.

# The Slow Reality

In the early iterations of **SwiftShadow**, proxy validation operated in a purely **synchronous** manner. Each proxy was tested **one at a time**, blocking execution until the request was completed or timed out. This approach, while straightforward, quickly revealed significant performance bottlenecks.

---

## How Proxy Validation Originally Worked

The initial implementation followed a simple pattern:

1. Take a proxy from the pool.
    
2. Send a test request to a known website (e.g., Amazon’s checkip service).
    
3. Wait for a response or timeout.
    
4. Mark the proxy as valid or invalid.
    
5. Move on to the next proxy.
    

This was implemented using a **synchronous** function like this:

```python
from requests import get

def checkProxy(proxy):
    proxyDict = {proxy[1]: proxy[0]}  # Format: {"http": "http://ip:port"}
    try:
        resp = get(
            f"{proxy[1]}://checkip.amazonaws.com", proxies=proxyDict, timeout=2
        ).text
        if resp.count(".") == 3:  # Basic IPv4 validation
            return True
        return False
    except Exception:
        return False

# Example usage
proxy_list = [("http://192.168.1.1:8080", "http"), ("http://192.168.1.2:8080", "http")]

valid_proxies = []
for proxy in proxy_list:
    if checkProxy(proxy):
        valid_proxies.append(proxy)

print(f"Valid proxies: {valid_proxies}")
```

## Why This Was a Problem

This approach had **severe limitations**, especially when handling **large proxy pools**:

* **Unbearably Long Wait Times** – Each request blocked the execution of the next proxy check, leading to **hours of waiting**.
    
* **Wasted Resources** – The CPU sat idle most of the time, simply waiting for responses.
    
* **Scalability Issues** – The system struggled to handle real-world workloads efficiently.
    

## A Real-World Scenario

Imagine you're running a **web scraping operation** with a pool of **5,000 proxies**. Your scraper depends on fresh, working proxies, so you need to validate them **daily**. With the synchronous approach.If we calculate the time required for **200 proxies** using the synchronous method, where each check takes an average of **2 seconds**, the total validation time would be:

$$200 \times 2 = 400 \text{ seconds} = 6.67 \text{ minutes}$$

So even for a relatively small proxy pool of **200 proxies**, you'd be **waiting nearly 7 minutes** before knowing which ones are usable. Now, imagine scaling this up to thousands of proxies—it quickly becomes unmanageable.

This further emphasizes why switching to an **asynchronous approach** became necessary.

# The Transformation

The slow, sequential proxy validation approach needed a **fundamental shift**. By using **asynchronous programming**, we enabled the system to check hundreds of proxies **simultaneously** instead of waiting for each one to finish.

## Step 1: Moving from Synchronous to Asynchronous

Originally, each proxy was validated **one by one**, causing bottlenecks. The new approach:  
✅ Use `asyncio.gather()` to process proxies **concurrently**.  
✅ Replace `requests.get()` with **aiohttp**, a non-blocking HTTP client.  
✅ Introduce **host IP filtering** to remove false positives.

## Step 2: Improved Proxy Validation with `swiftshadow`

With the improved function, we:

* Extract the **host’s external IP** to avoid detecting our own IP when testing proxies.
    
* Use `aiohttp.ClientSession()` efficiently to **reuse connections**, reducing overhead.
    
* Implement `find_ipv4_in_string()` to **extract valid IPs** from responses.
    
* Validate proxies **asynchronously**, handling failures gracefully.
    

---

### Before: Synchronous Proxy Validation (Inefficient)

```python
from requests import get

def checkProxy(proxy):
    proxyDict = {proxy[1]: proxy[0]}
    try:
        resp = get(
            f"{proxy[1]}://checkip.amazonaws.com", proxies=proxyDict, timeout=2
        ).text
        if resp.count(".") == 3:
            return True
        return False
    except Exception:
        return False
```

#### Issues:

* 🚨 **Each request blocks execution**, leading to massive delays.
    
* 🕒 Checking **200 proxies at 2s each = nearly 7 minutes**.
    
* ❌ Inefficient when scaling to **thousands of proxies**.
    

---

### After: Asynchronous Proxy Validation (Optimized)

```python
import asyncio
import re
import aiohttp
from swiftshadow.models import Proxy

async def get_host_ip(async_session: aiohttp.ClientSession) -> str | None:
    """Gets the host's external IP for validation."""
    async with async_session.get("http://checkip.amazonaws.com") as response:
        text = await response.text()
        return find_ipv4_in_string(text)

async def check_proxy(async_session: aiohttp.ClientSession, proxy: Proxy) -> str:
    """Check one proxy object."""
    async with async_session.get(
        url=f"{proxy.protocol}://checkip.amazonaws.com",
        proxy=proxy.as_string(),
        timeout=4,
    ) as response:
        return await response.text()

async def validate_proxies(proxies: list[Proxy]) -> list[Proxy]:
    """Validate all proxies asynchronously."""
    working_proxies: list[Proxy] = []
    async with aiohttp.ClientSession() as async_session:
        tasks = [asyncio.create_task(get_host_ip(async_session))]
        tasks.extend(asyncio.create_task(check_proxy(async_session, proxy)) for proxy in proxies)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        host_ip = results[0]
        results = results[1:]

        for proxy, result in zip(proxies, results):
            if isinstance(result, str) and (result_ip := find_ipv4_in_string(result)) and result_ip != host_ip:
                working_proxies.append(proxy)

    return working_proxies
```

---

## Key Improvements:

🔹 **Parallel Execution**: Instead of checking **one proxy at a time**, they are checked **simultaneously**.  
🔹 **Better Performance**: Checking 200 proxies now takes **just a few seconds** instead of minutes.  
🔹 **Filtering False Positives**: The host's IP is checked to avoid self-detection.  
🔹 **Scalability**: The method can handle **thousands of proxies** with minimal overhead.

# The Results: A 15x Speedup! 🚀

Switching from synchronous to asynchronous proxy validation has transformed Swiftshadow’s performance. The benchmarks speak for themselves:

| **Version** | **Validation Time** | **Speedup Factor** |
| --- | --- | --- |
| **v1.2.1 (Sync)** | ~162.5 seconds | 1x (Baseline) |
| **v2.0.0 (Async)** | ~10.7 seconds | 15x Faster |

## Impact on Real Users

* **Instant Feedback:** Users no longer wait over two minutes for proxy validation—now it's done in just over 10 seconds.
    
* **Seamless Scraping:** Large-scale web scraping becomes feasible, as the validated proxies are available almost instantly.
    
* **Resource Efficiency:** The asynchronous design makes better use of system resources by checking hundreds of proxies concurrently.
    

## Bonus Optimizations in v2.0.0

* **8 New Proxy Providers:** Expanded sources, including KangProxy and GoodProxy, mean more reliable IPs.
    
* **Smart Caching:** Switched to `pickle` for faster cache reads and writes.
    
* **Type Hints Everywhere:** Enhanced IDE support and code readability, which contributes to more maintainable code.
    

---

These performance improvements not only cut down validation time drastically but also make Swiftshadow a much more robust and scalable solution for anyone who relies on fast, efficient proxy management. If you're a web scraper, API tester, or just tired of slow proxy tools, this is a game-changer.

# Lessons Learned

* **User Feedback Drives Innovation:**  
    Issues like [#32 a](https://github.com/sachin-sankar/swiftshadow/issues/32)nd [#33 w](https://github.com/sachin-sankar/swiftshadow/issues/33)ere inva[lua](https://github.com/sachin-sankar/swiftshadow/issues/32)ble. [The](https://github.com/sachin-sankar/swiftshadow/issues/33)y highlighted real-world scenarios—like integrating with Quart—that exposed flaws in cache update and proxy rotation. This direct feedback helped refine async behavior and ensure that Swiftshadow works smoothly in production environments.
    
* **Async Isn't a Silver Bullet:**  
    Transitioning to asynchronous program[min](https://github.com/sachin-sankar/swiftshadow/issues/32)g is [pow](https://github.com/sachin-sankar/swiftshadow/issues/33)erful for I/O-bound tasks, but it isn't magic. While async methods can drastically reduce waiting times, they also introduce complexities—like managing event loops and ensuring non-blocking cache updates. This experience reinforced that async must be applied judiciously, and thorough testing is essential.
    
* **Async Cache Updates Must Be Non-Blocking:**  
    A key insight was the im[por](https://github.com/sachin-sankar/swiftshadow/issues/32)tance [of](https://github.com/sachin-sankar/swiftshadow/issues/33) performing cache updates in the background. Users needed the cache to refresh without blocking proxy requests. By implementing an asynchronous update function (e.g., `async_update()`), we minimized delays and prevented errors like "[asyncio.run](http://asyncio.run)() cannot be called from a running event loop."
    
* **Fine-Tuning Rotation Logic is Crucial:**  
    The community pointed out i[ssu](https://github.com/sachin-sankar/swiftshadow/issues/32)es wi[th](https://github.com/sachin-sankar/swiftshadow/issues/33) the `rotate()` method when auto-rotation was enabled and the cache expired. Adjustments were made to ensure that cache validation occurs only when necessary, avoiding unintended synchronous calls within an async event loop. These refinements have made Swiftshadow more robust and predictable in its behavior.
    
* **Iterative Testing and Community Collaboration Enhance Stability:**  
    R[eal](https://github.com/sachin-sankar/swiftshadow/issues/32)\-worl[d t](https://github.com/sachin-sankar/swiftshadow/issues/33)esting, such as running the library with a Quart application, uncovered edge cases that wouldn’t be apparent in isolated tests. The collaboration with user who even provided sample code and suggestions ensured that changes not only improved performance but also maintained functionality under diverse scenarios.
    

Each of these lessons has contributed to making Swiftshadow faster[, m](https://github.com/sachin-sankar/swiftshadow/issues/32)ore r[eli](https://github.com/sachin-sankar/swiftshadow/issues/33)able, and more user-friendly. The process reinforces that continuous community engagement and iterative development are key to building robust open-source tools.

# Conclusion

Swiftshadow has evolved from a simple, synchronous proxy rotator into a powerful, asynchronous tool that dramatically speeds up proxy validation—making it ideal for web scrapers, API testers, and developers looking for reliable proxy solutions. With real-world feedback driving continuous improvements, Swiftshadow now offers robust performance, efficient background cache updates, and finely-tuned rotation logic.

If you're tired of slow, blocking proxy tools, give Swiftshadow a try. Install it with a single command and experience the difference for yourself:

```sh
pip install swiftshadow
```

Check out the docs and [GitHub repository](https://github.com/sachin-sankar/swiftshadow) for more details and join the conversation on GitHub. Your feedback and contributions are welcome.

