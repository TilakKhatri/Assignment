import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { BiSearch, BsDownload } from 'react-icons/all'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { saveAs } from 'file-saver';

const url = "https://api.unsplash.com/photos?client_id=";
const api = "LQvV59f2FJIJ6c_R6LjUz4zi7INGdaLenG8joULnnN0";

function Photolibrary() {

  const [searchPhoto, setSearchPhoto] = useState([]);
  const [query, setQuery] = useState("");
  const [q, setQ] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();



  const fetchSearchImage = (qr) => {
    let page = 1; // each page contain 10 photos

    axios.get(`https://api.unsplash.com/search/photos?client_id=${api}&page=${page}&query=${qr}`)
      .then((res) => {
      setSearchPhoto(res.data.results)
      }).catch(err => console.log(err));

  }

  const fetchImage = () => {
    let page = 1; // each page contain 10 photos

    axios.get(`https://api.unsplash.com/photos?client_id=${api}&page=${page}`)
      .then((res) => {
        setPhotos(res.data)
      }).catch(err => console.log(err));

  }
  useEffect(() => {
    fetchSearchImage(q);
  }, [q]);
  useEffect(() => {
    fetchImage();
  }, []);

  const fetchSearchData = async () => {
    if (searchPhoto.length > 1000) {
      setHasMore(false);
    } else {
      axios.get(`https://api.unsplash.com/search/photos?client_id=${api}&page=${page+1}&query=${q}`)
        .then((res) => {
          console.log(page)
          setSearchPhoto((oldPage) => [...oldPage, ...res.data.results]);
          setPage((prevPage) => prevPage + 1);
        }).catch(err => console.log(err));

    }
  };

  const fetchData = async () => {
    if (photos.length > 1000) {
      setHasMore(false);
    } else {
      axios.get(`${url + api}&page=${page + 1}`)
        .then((res) => {
          setPhotos((oldPage) => [...oldPage, ...res.data]);
          setPage((prevPage) => prevPage + 1);
        }).catch(err => console.log(err));

    }
  };

  const getImage = (imgSrc) => {
    setImageSrc(imgSrc);
    setToggle(true);

  }

  const Search = () => {
    setQ(query);
  }
  const refresh =()=>{
    navigate(0);
  }

  return (
    <>
      <Header title={'Photo Library'} />
      <div>

        <div className="py-5  mx-auto max-w-md">
          {/* for image view */}
          {
            toggle && <div className=" fixed top-0 left-0 z-10 w-screen h-screen bg-black/70 flex justify-center items-center cursor-pointer">
              <a className="fixed z-90 top-6 right-8 text-white text-5xl font-bold"
                onClick={() => setToggle(false)}>&times;</a>
              <img src={`${imageSrc}`} alt="img" className="w-[600px] h-[500px] object-center" />
              <a className="fixed z-90 top-6 left-8 text-white text-5xl font-bold" href={`${imageSrc}`}  rel="noopener noreferrer"
              ><BsDownload />
              </a>
            </div>
          }
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch />
              <label htmlFor="query" className="sr-only" />
            </div>
            <input
              type="text"
              name="query"
              className="pl-8 py-2 rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border border-gray-500"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div>
                <button
                  type="button"
                  onClick={query ? Search : refresh}
                  className="justify-center px-4 py-2 bg-green-800 border-2 border-green-800 text-sm text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center rounded rounded-l-none"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  search
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto px-4 py-2 my-8 lg:mx-8">
          
       

              <InfiniteScroll
            dataLength={q ?searchPhoto.length : photos.length}
                next={searchPhoto.length > 0 ? fetchSearchData : fetchData}
                hasMore={hasMore}
                loader={<h4 className=' text-sm'>Loading...</h4>}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                  {

                   searchPhoto.length >0 ? searchPhoto.map((item, index) => (
                      <>
                        <div className="" key={item.id} >
                          <div className="w-full p-1 md:p-2  m-1 rounded-md cursor-pointer" onClick={() => getImage(item.urls.thumb)}>
                            <img src={`${item.urls.thumb}`} alt="gallary" className=' object-fit w-full h-[300px] rounded-md ' />
                          </div>
                        </div>
                      </>


                   )) : photos.map((item, index) => (
                     <>
                       <div className="" key={item.id} >
                         <div className="w-full p-1 md:p-2  m-1 rounded-md cursor-pointer" onClick={() => getImage(item.urls.thumb)}>
                           <img src={`${item.urls.thumb}`} alt="gallary" className=' object-fit w-full h-[300px] rounded-md ' />
                         </div>
                       </div>
                     </>


                   ))
                  }
                </div>
              </InfiniteScroll>

          
        </div>
      </div>

    </>
  )
}



export default Photolibrary