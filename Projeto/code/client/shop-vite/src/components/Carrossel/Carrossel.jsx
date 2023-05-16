import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import iphone from "../Carrossel/images/iphone.jpg";
import makeup from "../Carrossel/images/makeup.jpg";
import rubiks from "../Carrossel/images/rubiks.jpg";
import "./Carrossel.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const products = [ makeup, iphone, rubiks];

export default function Carrossel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  useEffect(() => {
    if (currentImageIndex === products.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex]);

  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(products.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const carouselVariants = {
    enter: { opacity: 0, x: -100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };
  
  return (
    <div className="carrossel">
      <div className="control-carrossel">
        <ArrowBackIosIcon onClick={prevImage} className="iconn" />
      </div>
      <div className="carrossel-slide">
        <AnimatePresence custom={currentImageIndex}>
          <motion.div
            key={currentImageIndex}
            className="carrossel__image-container"
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit={
              currentImageIndex > 0
                ? { opacity: 0, x: -100 }
                : { opacity: 0, x: 100 }
            }
            transition={{ duration: 0.8 }}
          >
            <img src={products[currentImageIndex]} alt="Imagem do Carrossel" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="control-carrossel">
        <ArrowForwardIosIcon onClick={nextImage} className="iconn" />
      </div>
    </div>
  );
}
