

const footer = () => {
  return (
    <footer className='w-full glass border-t border-white/10 mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h3 className='text-xl font-bold gradient-text mb-4'>MUSICAA</h3>
            <p className='text-gray-400 text-sm'>Your premier destination for quality musical instruments and equipment.</p>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li><a href='/products' className='hover:text-purple-400 transition-colors'>Shop Instruments</a></li>
              <li><a href='/about' className='hover:text-purple-400 transition-colors'>About Us</a></li>
              <li><a href='/contact' className='hover:text-purple-400 transition-colors'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Connect With Us</h4>
            <div className='flex space-x-4'>
              <a href='https://web.facebook.com/srijaldangol02/' target='_blank' rel='noopener noreferrer' className='w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110'>
                <span className='text-white'>f</span>
              </a>
              <a href='https://www.instagram.com/srijaldangol/' target='_blank' rel='noopener noreferrer' className='w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110'>
                <span className='text-white'>📷</span>
              </a>
              <a href='https://np.linkedin.com/in/srijal-dangol-18232a314' target='_blank' rel='noopener noreferrer' className='w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110'>
                <span className='text-white'>in</span>
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-white/10 pt-8 text-center'>
          <p className='text-gray-400 text-sm'>© 2025 Musicaa - Musical Instruments Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default footer;