import { TfiWorld } from "react-icons/tfi";
import logo from "../../public/logo.png";
import Image from "next/image";

const StartingFooter = () => {
  //Le saque al contenedor padre (footer) el min-w-1200px... quiero probar que todos los contenedor padres sean w-full y ver de q el padre de todos esos tenga el minimo
  return (
    <footer className="flex h-auto w-full flex-col bg-optionsBar  ">
      <a
        href="#"
        className="h-auto w-auto "
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="hover:saturate-125 mx-auto  mb-[40px] flex h-[49px] w-auto cursor-pointer items-center bg-footerBackToTop hover:brightness-110">
          <span className="] mx-auto  flex h-[19px] w-auto items-center justify-center  font-sans text-white">
            {" "}
            Back to top
          </span>
        </div>
      </a>

      <div className="mx-[15.5px]  flex   h-[320px] bg-optionsBar  font-sans ">
        <div className="flex w-full justify-center space-x-[100px] px-[10px]">
          <div>
            <div className="mb-[14px] mt-[6px] h-auto w-auto text-[16px] font-bold text-whiteTextFooter">
              Get to Know Us
            </div>
            <ul className="cursor-pointer space-y-[10px] text-[14px] text-whiteTextFooter ">
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">Blog</li>
              <li className="hover:underline">About Site</li>
              <li className="hover:underline">Investor Relations</li>
              <li className="hover:underline">Site Devices</li>
              <li className="hover:underline">Amazon Science</li>
            </ul>
          </div>

          <div>
            <div className="mb-[14px] mt-[6px] h-auto w-auto text-[16px] font-bold text-whiteTextFooter ">
              Make Money with Us
            </div>
            <ul className="cursor-pointer space-y-[10px] text-[14px] text-whiteTextFooter">
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
            <div className="mb-[14px] mt-[6px] h-auto w-auto text-[16px] font-bold text-whiteTextFooter ">
              Site Payment Products
            </div>
            <ul className="cursor-pointer space-y-[10px] text-[14px] text-whiteTextFooter">
              <li className="hover:underline">Site Business Card</li>
              <li className="hover:underline">Shop with Points</li>
              <li className="hover:underline">Reload Your Balance</li>
              <li className="hover:underline">Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <div className="mb-[14px] mt-[6px] h-auto w-auto text-[16px] font-bold text-whiteTextFooter ">
              Let Us Help You
            </div>
            <ul className="cursor-pointer space-y-[10px] text-[14px] text-whiteTextFooter">
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

      <div className="mt-[40px] h-[1px] w-full bg-footerBackToTop"></div>

      <div className="mx-auto mb-[10px] mt-[20px] flex h-[50px] w-auto items-center justify-center ">
        <Image
          className="h-[36px] w-[36px] "
          src={logo}
          alt="cart"
          width={40}
          height={40}
        />

        <div className="ml-[100px] flex items-center ">
          <div className="flex h-[34px] w-auto items-center justify-center rounded-[3px] border border-graySelectBorderFooter pl-2 pr-8 text-white">
            <TfiWorld className=""></TfiWorld>

            <select className=" w-full cursor-pointer truncate bg-optionsBar text-center font-sans text-sm font-semibold  text-graySelectTextFooter outline-none ">
              <option value="1" className=" bg-optionsBar ">
                English
              </option>
              <option value="2" className=" bg-optionsBar ">
                Spanish
              </option>
            </select>
          </div>

          <div className="ar mx-2 flex h-[34px] w-auto cursor-pointer items-center justify-center rounded-[3px] border border-graySelectBorderFooter pl-2 pr-8 font-sans text-sm font-semibold  text-graySelectTextFooter outline-none">
            $ USD - U.S. Dollar
          </div>

          <div className="ar flex h-[34px] w-auto cursor-pointer items-center justify-center rounded-[3px] border border-graySelectBorderFooter pl-2 pr-8 font-sans text-sm font-semibold  text-graySelectTextFooter outline-none">
            Argentina
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[20px] flex h-auto w-full justify-center bg-footerBgOptions py-[30px]">
        <div className="mx-auto grid h-auto w-auto max-w-[1000px] grid-cols-7 grid-rows-4 gap-x-[30px] gap-y-3 font-sans text-[12px] leading-none">
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Site Music
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Stream millions of songs
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Site Ads
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Reach customers wherever they spend their time
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              6pm
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Score deals on fashion brands
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              AbeBooks
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Books, art & collectibles
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              ACX
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Audiobook Publishing Made Easy
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Sell on Site
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Start a Selling Account
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Site Business
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Everything For Your Business
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              {" "}
              SiteGlobal
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Ship Orders Internationally
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Home Services
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Experienced Pros Happiness Guarantee
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Siet Web Services
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Scalable Cloud Computing Services
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Audible
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Listen to Books & Original Audio Performances
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Box Office Mojo
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Find Movie Box Office Data
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Goodreads
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Book reviews & recommendations
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              IMDb
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Movies, TV & Celebrities
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              IMDbPro
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Get Info Entertainment Professionals Need
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              {" "}
              Kindle Direct Publishing
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Indie Digital & Print Publishing Made Easy
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Prime Video Direct
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Video Distribution Made Easy
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Shopbop
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Designer Fashion Brands
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              {" "}
              Woot!
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Deals and Shenanigans
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Zappos
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Shoes & Clothing
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Ring
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Smart Home Security Systems
            </p>
          </div>
          <div></div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              eero WiFi
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Stream 4K Video in Every Room
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              {" "}
              Blink
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Smart Security for Every Home
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              Neighbors App
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Real-Time Crime & Safety Alerts
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline ">
              Amazon Subscription Boxes
            </p>
            <p className="cursor-pointer leading-none text-grayTextFooter hover:underline">
              Top subscription boxes – right to your door
            </p>
          </div>
          <div>
            <p className="cursor-pointer text-whiteTextFooter hover:underline">
              PillPack
            </p>
            <p className="cursor-pointer text-grayTextFooter hover:underline">
              Pharmacy Simplified
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto flex h-auto  w-full flex-col items-center justify-center bg-footerBgOptions pb-[30px] font-sans text-xs text-whiteTextFooter">
        <div className="flex w-full justify-center">
          <p className="cursor-pointer hover:underline">Conditions of Use</p>
          <p className=" ml-7 mr-7 cursor-pointer hover:underline">
            Privacy Notice
          </p>
          <p className="cursor-pointer hover:underline">
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
