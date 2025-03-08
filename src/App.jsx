function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-bold">
            MyLogo
          </a>
          <div className="space-x-4">
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <p className="mt-4">
          Welcome to our homepage. This is a simple example of a homepage layout with a navbar.
        </p>
      </main>
    </>
  );
}

export default App;
