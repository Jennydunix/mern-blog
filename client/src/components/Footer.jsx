import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-col-1">
          <div className=" mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                TechDunix
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            {/* ABOUT */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://carefinder-zeta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CareFinder Project
                </Footer.Link>
                <Footer.Link
                  href="https://crypto-website-zeta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crypto Website
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* FOLLOW  */}
            <div>
              <Footer.Title title="FOLLOW US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Jennydunix"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* LEGAL */}
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="TechDunix's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook}/> 
            <Footer.Icon href="https://www.instagram.com/thejennyluchi/" icon={BsInstagram}/> 
            <Footer.Icon href="https://github.com/Jennydunix" icon={BsGithub}/> 
            <Footer.Icon href="https://twitter.com/jennydunix" icon={BsTwitterX}/> 
            <Footer.Icon href="#" icon={BsDribbble}/> 
          </div>
        </div>
      </div>
    </Footer>
  );
}
