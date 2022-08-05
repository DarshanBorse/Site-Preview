import { useState } from "react";
import { getLinkPreview } from "link-preview-js";
import { Helmet } from "react-helmet";

function App() {
  // Define state
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // Handle metadata function
  const handleForm = async (e) => {
    e.preventDefault();
    setData(null);
    setLoading(true);

    if (uri) {
      try {
        const metadata = await getLinkPreview(uri);

        if (metadata.title === "") {
          setError("This site does not present metadata..");
        } else {
          setData(metadata);
          setError(false);
        }

        setUri("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Please, Enter a valid uri..");
      }
    } else {
      setLoading(false);
      setError("Please, Provide a uri..");
    }
  };

  return (
    <>
      {/* Page title  */}
      <Helmet>
        <title>Site - Preview</title>
      </Helmet>
      {/* Body  */}
      <div className="bg-gray-300 min-h-screen">
        <div className="py-10 flex-1 flex justify-center flex-col items-center ">
          <div>
            <h1 className="text-3xl text-center text-gray-900 pb-5">Site Previewer</h1>

            <form onSubmit={handleForm}>
              <div className="lg:flex justify-between items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter a uri...."
                  onChange={(e) => setUri(e.target.value)}
                  value={uri}
                  className={`block p-2 xs:mt-3 w-full  text-gray-900 bg-gray-50 rounded-md border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    error ? "border-red-500" : null
                  }`}
                />

                <button
                  type="submit"
                  className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full xs:px-3 sm:w-auto  xs:mr-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 xs:mt-3"
                >
                  Submit
                </button>
              </div>
            </form>

            <p className="text-red-600 mt-1">{error ? error : ""}</p>

            <div>
              {loading ? (
                <div className="text-center my-3">Loading...</div>
              ) : data ? (
                <div className="max-w-sm mt-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <a href="#something">
                    <img className="rounded-t-lg h-80 w-full" src={data.images[0]} alt="Url icons.." />
                  </a>
                  <div className="p-5">
                    <a href="#something">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description.length > 130 ? data.description.slice(0, 130) + "..." : data.description}</p>
                    <div className="flex justify-center mx-auto items-center mt-5">
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noreferrer"
                        className=" py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>
              ) : error ? null : (
                <div className="text-md mt-3">You can view the link's metadata here..</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
