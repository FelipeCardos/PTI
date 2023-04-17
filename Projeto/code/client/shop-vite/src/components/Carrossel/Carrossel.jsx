import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import book from "../Carrossel/images/book.jpg";
import iphone from "../Carrossel/images/iphone.jpg";
import makeup from "../Carrossel/images/makeup.jpg";
import rubiks from "../Carrossel/images/rubiks.jpg";
import "./Carrossel.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const products = [book, makeup, iphone, rubiks]
export default function Carrossel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contador, setContador] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex + 1);
    console.log(currentImageIndex);
  };
  useEffect(() => {
    if (currentImageIndex === products.length){
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex])

  
  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(products.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };


  return (
    <div className="carrossel">
      <div  className="control-carrossel"><ArrowBackIosIcon onClick={prevImage} className="iconn"/></div>
      <div className="carrossel-slide">
      <motion.div
          className="carrossel__image-container"
          initial={{ x: 100 }} // posição inicial do elemento
          animate={{ x: 0 }} // posição final do elemento
          transition={{ duration: 0.80 }} // duração da transição
        >
          <img src={products[currentImageIndex]} alt="Imagem do Carrossel" />
        </motion.div>
      </div>
      <div className="control-carrossel"><ArrowForwardIosIcon onClick={nextImage} className="iconn"/></div>
    </div>
    // <div className='Carrossel-Container'>
    //   <motion.div
    //     ref={carrossel}
    //     className='Carrossel'
    //     whileTap={{ cursor: "grabbing" }}
    //   >
    //     <motion.div
    //       className='Carrossel-Slide'
    //       drag='x'
    //       dragConstraints={{ right: 0, left: -width }}
    //       initial={{ x: 100 }}
    //       animate={{ x: 0 }}
    //       transition={{ duration: 0.8 }}
    //     >
    //       {products.map((image) => (
    //         <motion.div className='Carrossel-Item' key={image}>
    //           <img src={image} alt='imagem' />
    //         </motion.div>
    //       ))}
    //     </motion.div>
    //   </motion.div>
    // </div>
  );
}
