'use client'
import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [theme])

  return (
    <div className='text-xl p-3 border border-transparent hover:bg-neutral-50 hover:rounded-2xl hover:shadow flex flex-nowrap items-center justify-center text-center cursor-pointer dark:hover:bg-neutral-950 dark:shadow-neutral-700' onClick={handleThemeToggle}>
      {theme === 'dark' ? <FiMoon /> : <FiSun />}
    </div>
  )
}

export default ThemeToggle