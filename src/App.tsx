import GithubIcon from "./icons/github";
import HashnodeIcon from "./icons/HashnodeIcon";
import KeyIcon from "./icons/KeyIcon";
import LinkedIcon from "./icons/linkedin";
import MailIcon from "./icons/MailIcon";
import SubstackIcon from "./icons/SubstackIcon";

function App() {
  const iconClasses = `w-[9%] md:w-[6%] lg:w-[3%] lg:md:hover:scale-150 transition-all cursor-pointer`;
  return (
    <div className="w-screen h-screen flex flex-col justify-center bg-black gap-10">
      <div className="flex flex-col items-center text-poster-yellow font-sekuya text-6xl md:text-8xl lg:text-[13em] lg:leading-45  lg:mr-4">
        <span>Sachin</span>
        <span>Sankar</span>
      </div>
      <div className="flex justify-center items-center divide-x-2 gap-5 lg:gap-8 ">
        <LinkedIcon
          fill="#0a66c2"
          className={iconClasses}
          onClick={() => {
            window.open("https://www.linkedin.com/in/sachin-sankar/", "_blank");
          }}
        />
        <GithubIcon
          fill="#ffffff"
          className={iconClasses}
          onClick={() => {
            window.open("https://github.com/sachin-sankar", "_blank");
          }}
        />
        <MailIcon
          fill="#EA4335"
          className={iconClasses}
          onClick={() => {
            window.open("mailto:mail.sachinsankar@gmail.com", "_blank");
          }}
        />
        <HashnodeIcon
          fill="#2962FF"
          className={iconClasses}
          onClick={() => {
            window.open("https://bitsomnia.hashnode.dev/", "_blank");
          }}
        />
        <SubstackIcon
          fill="#FF6719"
          className={iconClasses}
          onClick={() => {
            window.open("https://substack.com/@sachinsankar", "_blank");
          }}
        />
        <KeyIcon
          fill="#0093DD"
          className={iconClasses}
          onClick={() => {
            window.open(
              "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xa33ba241b4bc8310df63e510a536f62f57c64035",
              "_blank",
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
