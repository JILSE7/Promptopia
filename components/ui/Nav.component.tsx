'use client'

import { Dispatch, FC, SetStateAction, useEffect, useId, useState } from "react";
import { ClientSafeProvider, getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth";

const NavBar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const singOut = () => {
    console.log("dd");
  }


  useEffect(() => {
    const setProvidersFunction = async () => {
      const response = await getProviders();
      console.log({ response });
      setProviders(response)
    }

    setProvidersFunction()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptiopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/*Desktop Navigation*/}
      <DesktopNav session={session} providers={providers} singOut={singOut} />

      {/*Mobile Navigation*/}
      <MovileNav
        session={session}
        providers={providers}
        singOut={singOut}
        setToggleDropdown={setToggleDropdown}
        toggleDropdown={toggleDropdown}
      />

    </nav>
  )
}

export default NavBar;


const DesktopNav: FC<{ providers: any, singOut: () => any, session: Session | null }> = ({
  providers,
  session,
  singOut
}) => {
  const reactId = useId()

  return (
    < div className="sm:flex hidden relative" >
      {
        session?.user ? (
          <div className="flex gap-3 md:gap-5" >
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button type="button" onClick={singOut} className="outline_btn">Sing Out</button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                src={session?.user.image || "/assets/images/profile.svg"}
                alt="Profile Image"
                width={30}
                height={30}
              // onClick={() => setToggleDropdown((state) => !state)}
              />
            </Link>
          </div >
        ) : (
          <>
            {
              providers && Object.values(providers).map(() => (
                <button
                  type="button"
                  key={reactId}
                  onClick={() => signIn(providers.id)}
                >
                  Sing In
                </button>
              ))
            }
          </>
        )
      }
    </div >
  )
}

const MovileNav: FC<{ providers: any, singOut: () => any, session: Session | null, setToggleDropdown: Dispatch<SetStateAction<boolean>>, toggleDropdown: boolean }> = ({
  providers,
  session,
  singOut,
  toggleDropdown,
  setToggleDropdown
}) => {
  const reactId = useId()

  return (
    <div className="sm:hidden flex relative">
      {
        session?.user ? (
          <div className="flex">
            <Image
              className="rounded-full"
              src={session?.user.image || "/assets/images/profile.svg"}
              alt="Profile Image"
              width={30}
              height={30}
              onClick={() => setToggleDropdown((state) => !state)}
            />

            {
              toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href={"/profile"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown((state) => !state)}
                  >
                    Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown((state) => !state)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown((state) => !state)
                      singOut();
                    }}
                  >
                    Sing Out
                  </button>
                </div>
              )
            }
          </div>
        ) : (
          <>
            {
              providers && Object.values(providers).map((_, i) => (
                <button
                  type="button"
                  key={reactId}
                  onClick={() => signIn(providers.id)}
                >
                  Sing In
                </button>
              ))
            }
          </>
        )
      }
    </div>
  )
}