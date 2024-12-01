const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <p>© 2024 DeStore - Diego Ambrocio. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.674C0 23.407.593 24 1.325 24H12.81v-9.294H9.691V11.08h3.12V8.414c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.463.098 2.794.142v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.31h3.59l-.467 3.626h-3.123V24h6.126c.73 0 1.325-.593 1.325-1.326V1.326c0-.733-.593-1.326-1.325-1.326z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.557a9.832 9.832 0 01-2.828.775A4.932 4.932 0 0023.337 3c-.96.572-2.02.987-3.15 1.212A4.925 4.925 0 0016.616 3c-2.73 0-4.945 2.214-4.945 4.943 0 .387.045.764.127 1.127C7.691 8.89 4.066 6.712 1.64 3.149a4.924 4.924 0 001.523 6.579A4.904 4.904 0 01.964 9.22v.062c0 2.383 1.693 4.374 3.946 4.825a4.908 4.908 0 01-2.224.085 4.937 4.937 0 004.6 3.417A9.86 9.86 0 010 21.539 13.932 13.932 0 007.548 24c9.057 0 14.01-7.5 14.01-14.01 0-.213-.005-.425-.014-.637A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
