import React from 'react'
import imagLogo from '../../assets/LogoWhight.png'
import Logo from './Logo'

export default function HomeNavBar() {
    return (
        <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Logo/>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary">Teachers</a>
            <a href="#" className="text-gray-700 hover:text-primary">Parent</a>
            <a href="#" className="text-gray-700 hover:text-primary">About</a>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
    )
}
