import { useContext } from "react";
import Link from "next/link";
import ProfileContext from "@/store/profile-context";
import Loader from "../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Image from "next/image";
import order from "../../public/order.png";
import account from "../../public/account.png";
import address from "../../public/address.png";
import amazon_business from "../../public/amazon_business.jpg";
import archived_orders from "../../public/archived_orders.png";
import contact from "../../public/contact.png";
import digital_devices from "../../public/digital_devices.png";
import GiftCard from "../../public/GiftCard.png";
import lists from "../../public/lists.png";
import messages from "../../public/messages.jpg";
import payment from "../../public/payment.png";
import prime from "../../public/prime.png";
import security from "../../public/security.png";
import ProductsFooter from "../Footers/ProductsFooter";
import StartingFooter from "../Footers/StartingFooter";
import Language from "../navigation/LanguageNav/LanguageNav";
import OptionsBar from "../navigation/OptionsBar/OptionsBar";
import SearchBar from "../navigation/SearchBar/SearchBar";
import Orders from "../navigation/PurchasesNav/PurchasesNav";
import Cart from "../navigation/CartNav/CartNav";
import logoSite from "../../public/logoSite.png";

const Profile = () => {
  const profileCtx = useContext(ProfileContext);

  if (profileCtx.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (profileCtx.error) {
    return (
      <div className=" flex h-screen min-w-[1200px]  flex-col  items-center bg-white">
        <div
          className="mt-20 flex h-20 w-full  max-w-96 rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20"
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>

          <div className="flex flex-col justify-center    ">
            <h1 className="font-sans  text-lg text-[#BA0933]">
              A problem occurred
            </h1>
            <h2 className="  font-sans text-xs text-blackText">
              {profileCtx.error}
            </h2>
          </div>
        </div>
        <Link href="/">
          <div className="mt-[14px] flex h-[29px] items-center rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] font-sans text-[13px] text-[#0F1111] hover:bg-[#f7ca00]">
            Back
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-w-[1200px]  bg-white">
      <div className="flex h-[55px] w-full items-center space-x-2 bg-navColor">
        <Link href="/">
          <div className=" ml-4 flex h-[45px] w-auto cursor-pointer items-center justify-center   rounded-sm border border-transparent  hover:border-white">
            <Image
              src={logoSite}
              alt="cart"
              width={90}
              height={90}
              className="mt-[13px]"
            />
          </div>
        </Link>
        <SearchBar></SearchBar>
        <Language></Language>
        <div className="max-w-38 flex min-h-[45px] w-auto cursor-pointer flex-col justify-center truncate text-nowrap rounded-sm border border-transparent px-3 hover:border-white">
          <p className="font-sans text-xs font-thin text-white">
            Hello {profileCtx.name}
          </p>
          <p className="font-sans text-sm font-semibold text-white ">
            {" "}
            Account & Lists
          </p>
        </div>
        <Orders></Orders>
        <Cart></Cart>
      </div>
      <OptionsBar></OptionsBar>
      <div className="flex justify-center px-[18px] pb-[60px]  pt-[14px]">
        <div className="mx-auto my-0 flex  max-w-[1000px] grow flex-col">
          <div className="mb-[12px] w-full font-sans text-[28px] font-normal leading-9 text-[#0F1111]">
            Your Account
          </div>
          <div className="grid  w-full grid-cols-3 grid-rows-[100px_100px_150px_100px_140px] gap-x-[20px] gap-y-[20px] ">
            <Link href="/purchases">
              <div className="flex  cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
                <Image
                  src={order}
                  alt="order"
                  width={66}
                  height={66}
                  className="max-h-[66px]"
                />

                <div className="ml-[6px] flex flex-col  ">
                  <h1 className="font-sans text-[17px] text-[#111111]">
                    Your Orders
                  </h1>
                  <h2 className="font-sans text-[14px] text-[#565959]">
                    Track, return, cancel an order, download invoice or buy
                    again
                  </h2>
                </div>
              </div>
            </Link>
            <Link href="/profile/update">
              <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
                <Image
                  src={security}
                  alt="order"
                  width={66}
                  height={66}
                  className="max-h-[66px]"
                />
                <div className="ml-[6px] flex flex-col  ">
                  <h1 className="font-sans text-[17px] text-[#111111]">
                    Login & security
                  </h1>
                  <h2 className="font-sans text-[14px] text-[#565959]">
                    Edit login, name, and mobile number
                  </h2>
                </div>
              </div>
            </Link>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={prime}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">Prime</h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Manage your membership, view benefits, and payment settings
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={address}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your address
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Edit, remove or set default address
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={GiftCard}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Gidt cards
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  View balance or redeem a card, and purchase a new Gift Card
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={payment}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your Payments
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  View all transactions, manage payment methods and settings
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={account}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your Profiles
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Manage, add, or remove user profiles for personalized
                  experiences
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={digital_devices}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Digital Services and Device Support
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Troubleshoot device issues, manage or cancel digital
                  subscriptions
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={archived_orders}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Archived orders
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  View and manage your archived orders
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={lists}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your Lists
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  View, modify, and share your lists, or create new ones
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={contact}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Customer Service
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Browse self service options, help articles or contact us
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={messages}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your Messages
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  View or respond to messages from Amazon, Sellers and Buyers
                </h2>
              </div>
            </div>
            <div className="flex cursor-pointer rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] hover:bg-[#d5d9d9] hover:bg-opacity-60">
              <Image
                src={amazon_business}
                alt="order"
                width={66}
                height={66}
                className="max-h-[66px]"
              />
              <div className="ml-[6px] flex flex-col  ">
                <h1 className="font-sans text-[17px] text-[#111111]">
                  Your business account
                </h1>
                <h2 className="font-sans text-[14px] text-[#565959]">
                  Sign up for free to save with business-exclusive pricing,
                  schedule fast deliveries to businss-hours
                </h2>
              </div>
            </div>
          </div>
          <div className="my-[32px] h-[2px] w-full bg-[#D5D9D9] bg-opacity-70"></div>

          <div className="grid  w-full grid-cols-3   grid-rows-[385px_360px_135px] gap-x-[20px] gap-y-[20px] ">
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Ordering and shopping preferences
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your Address
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your Payments
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your Transactions
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your Site Profile
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    1-Click settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Fresh settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Key settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Language preferences
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage saved IDs
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Coupons
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Product Vouchers
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    VAT registration number
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Digital content and devices
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    All things Alexa
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage content and devices
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage Digital Delivery
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your apps
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Prime Video settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Music settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage Site Drive and photos
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Twitch settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Audible settings
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Coins
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Digital gifts you have recived
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Digital and device forum
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Comixology settings
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Memberships and subscriptions
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Kindle Unlimited
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Prime Video Channels
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Music Unlimited
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Subscribe & Save
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Kids+
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Audible membership
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your Essentials
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Magazine subscriptions
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    One Medical membership for Prime members
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Other subscriptions
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Communication and content
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Email subscriptions
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Advertising preferences
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Communication preferences
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Shipment updates via text
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Alexa shopping notifications
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Deals Notifications
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Videos you have uploaded
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Purchase Reminders
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Shopping programs and rentals
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    But now, pay over time
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Thirds Party Credit Card Installment
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage Your Site Family
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage Your Profiles
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Rentals by Site
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Household
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    No-Rush rewards summary
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Teens Program
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Pet Profiles
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Shop with Points
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Second Chance
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Benefits balance
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Other programs
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Account Linking
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site credit cards
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Your seller account
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Login with Site
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Pay
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Manage your trade-ins
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site Web Services
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Site tax exemption program
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Store Analytics
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    In-Store Promo Wallet
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg border border-solid border-[#D5D9D9] bg-[#fff] px-[18px] py-[14px] ">
              <div className=" flex flex-col  ">
                <h2 className="mb-[4px] pb-[4px] font-sans text-[17px] font-bold text-[#0F1111] ">
                  Data and Privacy
                </h2>
                <ul className="space-y-[4px] font-sans text-[14px] text-[#007185]">
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Request Your Information
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Close Your Amazon Account
                  </li>
                  <li className="cursor-pointer hover:text-[#C45500] hover:underline">
                    Privacy Notice
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductsFooter></ProductsFooter>
      <StartingFooter></StartingFooter>
    </div>
  );
};

export default Profile;
