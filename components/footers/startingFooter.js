import { TfiWorld } from "react-icons/tfi";
import logo from "../../public/logo.png";
import Image from "next/image";

const StartingFooter = () => {
  //Le saque al contenedor padre (footer) el min-w-1200px... quiero probar que todos los contenedor padres sean w-full y ver de q el padre de todos esos tenga el minimo
  return (
    <footer className="flex flex-col mt-8 w-full h-auto bg-optionsBar  ">
      <a
        href="#"
        className="w-auto h-auto "
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="flex items-center  w-auto mx-auto h-[49px] mb-[40px] bg-footerBackToTop cursor-pointer hover:brightness-110 hover:saturate-125">
          <span className="flex items-center  justify-center w-auto mx-auto h-[19px] text-white  font-sans ]">
            {" "}
            Back to top
          </span>
        </div>
      </a>

      <div className="flex  mx-[15.5px]   h-[320px] bg-optionsBar  font-sans ">
        <div className="px-[10px] w-full flex justify-center space-x-[100px]">
          <div>
            <div className="w-auto h-auto mt-[6px] mb-[14px] text-[16px] text-whiteTextFooter font-bold">
              Get to Know Us
            </div>
            <ul className="space-y-[10px] text-[14px] text-whiteTextFooter cursor-pointer ">
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">Blog</li>
              <li className="hover:underline">About Site</li>
              <li className="hover:underline">Investor Relations</li>
              <li className="hover:underline">Site Devices</li>
              <li className="hover:underline">Amazon Science</li>
            </ul>
          </div>

          <div>
            <div className="w-auto h-auto mt-[6px] mb-[14px] text-[16px] text-whiteTextFooter font-bold ">
              Make Money with Us
            </div>
            <ul className="space-y-[10px] text-[14px] text-whiteTextFooter cursor-pointer">
              <li className="hover:underline">Sell products on Site</li>
              <li className="hover:underline">Sell on Site Business</li>
              <li className="hover:underline">Sell apps on Amazon</li>
              <li className="hover:underline">Become an Affiliate</li>
              <li className="hover:underline">Advertise Your Products</li>
              <li className="hover:underline">Self-Publish with Us</li>
              <li className="hover:underline">Host an Amazon Hub</li>
              <li className="hover:underline">See More Make Money with Us</li>
            </ul>
          </div>
          <div>
            <div className="w-auto h-auto mt-[6px] mb-[14px] text-[16px] text-whiteTextFooter font-bold ">
              Site Payment Products
            </div>
            <ul className="space-y-[10px] text-[14px] text-whiteTextFooter cursor-pointer">
              <li className="hover:underline">Site Business Card</li>
              <li className="hover:underline">Shop with Points</li>
              <li className="hover:underline">Reload Your Balance</li>
              <li className="hover:underline">Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <div className="w-auto h-auto mt-[6px] mb-[14px] text-[16px] text-whiteTextFooter font-bold ">
              Let Us Help You
            </div>
            <ul className="space-y-[10px] text-[14px] text-whiteTextFooter cursor-pointer">
              <li className="hover:underline">Site and COVID-19</li>
              <li className="hover:underline">Your Account</li>
              <li className="hover:underline">Your Orders</li>
              <li className="hover:underline">Shipping Rates & Policies</li>
              <li className="hover:underline">Returns & Replacements</li>
              <li className="hover:underline">
                Manage Your Content and Devices
              </li>
              <li className="hover:underline">Site Assistant</li>
              <li className="hover:underline">Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-footerBackToTop mt-[40px]"></div>

      <div className="flex justify-center items-center w-auto h-[50px] mb-[10px] mt-[20px] mx-auto ">
        <Image
          className="h-[36px] w-[36px] "
          src={logo}
          alt="cart"
          width={40}
          height={40}
        />

        <div className="flex items-center ml-[100px] ">
          <div className="flex items-center justify-center h-[34px] w-auto pl-2 pr-8 border border-graySelectBorderFooter rounded-[3px] text-white">
            <TfiWorld className=""></TfiWorld>

            <select className=" w-full text-center text-graySelectTextFooter truncate bg-optionsBar text-sm font-semibold cursor-pointer  outline-none font-sans ">
              <option value="1" className=" bg-optionsBar ">
                English
              </option>
              <option value="2" className=" bg-optionsBar ">
                Spanish
              </option>
            </select>
          </div>

          <div className="flex items-center justify-center h-[34px] w-auto pl-2 pr-8 border border-graySelectBorderFooter mx-2 rounded-[3px] text-graySelectTextFooter ar text-sm font-semibold cursor-pointer  outline-none font-sans">
            $ USD - U.S. Dollar
          </div>

          <div className="flex items-center justify-center h-[34px] w-auto pl-2 pr-8 border border-graySelectBorderFooter rounded-[3px] text-graySelectTextFooter ar text-sm font-semibold cursor-pointer  outline-none font-sans">
            Argentina
          </div>
        </div>
      </div>

      <div className="mt-[20px] w-full h-auto py-[30px] flex justify-center mx-auto bg-footerBgOptions">
        <div className="grid grid-rows-4 grid-cols-7 font-sans w-auto max-w-[1000px] mx-auto gap-x-[30px] gap-y-3 h-auto text-[12px] leading-none">
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Site Music
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Stream millions of songs
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Site Ads
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Reach customers wherever they spend their time
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              6pm
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Score deals on fashion brands
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              AbeBooks
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Books, art & collectibles
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              ACX
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Audiobook Publishing Made Easy
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Sell on Site
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Start a Selling Account
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Site Business
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Everything For Your Business
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              {" "}
              SiteGlobal
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Ship Orders Internationally
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Home Services
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Experienced Pros Happiness Guarantee
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Siet Web Services
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Scalable Cloud Computing Services
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Audible
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Listen to Books & Original Audio Performances
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Box Office Mojo
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Find Movie Box Office Data
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Goodreads
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Book reviews & recommendations
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              IMDb
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Movies, TV & Celebrities
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              IMDbPro
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Get Info Entertainment Professionals Need
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              {" "}
              Kindle Direct Publishing
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Indie Digital & Print Publishing Made Easy
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Prime Video Direct
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Video Distribution Made Easy
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Shopbop
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Designer Fashion Brands
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              {" "}
              Woot!
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Deals and Shenanigans
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Zappos
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Shoes & Clothing
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Ring
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Smart Home Security Systems
            </p>
          </div>
          <div></div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              eero WiFi
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Stream 4K Video in Every Room
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              {" "}
              Blink
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Smart Security for Every Home
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              Neighbors App
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Real-Time Crime & Safety Alerts
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer ">
              Amazon Subscription Boxes
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer leading-none">
              Top subscription boxes – right to your door
            </p>
          </div>
          <div>
            <p className="text-whiteTextFooter hover:underline cursor-pointer">
              PillPack
            </p>
            <p className="text-grayTextFooter hover:underline cursor-pointer">
              Pharmacy Simplified
            </p>
          </div>
        </div>
      </div>

      <div className=" w-full h-auto pb-[30px]  justify-center mx-auto bg-footerBgOptions flex flex-col items-center text-whiteTextFooter text-xs font-sans">
        <div className="w-full flex justify-center">
          <p className="hover:underline cursor-pointer">Conditions of Use</p>
          <p className=" mr-7 ml-7 hover:underline cursor-pointer">
            Privacy Notice
          </p>
          <p className="hover:underline cursor-pointer">
            Your Ads Privacy Choices
          </p>
        </div>

        <p>&copy; 2023 My Application. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default StartingFooter;

//    <TfiWorld className="mr-[10px]"></TfiWorld> English
