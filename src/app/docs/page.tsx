import Link from 'next/link'

export default function Docs() {
    return (
    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 mt-20">
        <h1 className="h1 mb-4" data-aos="fade-up">Docket</h1>
        <p className="text-xl text-gray-800 mb-8" data-aos="fade-up" data-aos-delay="200">Try out Docket now!</p>
        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div data-aos="fade-up" data-aos-delay="400">
            <Link className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto sm:ml-4" href="/docs/create">Create Docket</Link>
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            <Link className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="/docs/retrieve">View Dockets</Link>
          </div>
        </div>
      </div>
    );
}
