import Link from "next/link";

const Header = () => {
  return (
    <header className='flex justify-between p-5'>
      <div className='flex items-center space-x-5'>
        <Link href="/">
          <img
            src="https://links.papareact.com/yvf"
            className="w-44 object-contain cursor-pointer"
            alt=""
          />
        </Link>
        <ul className="hidden md:inline-flex items-center space-x-5 cursor-pointer">
          <li>About</li>
          <li>Contact</li>
          <li>About</li>
          <li className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </li>
        </ul>
      </div>
      <ul className="flex items-center space-x-5 text-green-600 cursor-pointer">
        <li>Sign In</li>
        <li className='border px-4 py-1 rounded-full border-green-600'>Get Started</li>
      </ul>
    </header>
  );
};

export default Header;
