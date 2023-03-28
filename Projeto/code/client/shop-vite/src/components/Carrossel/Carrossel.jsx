import  {useState, useEffect, useRef} from 'react';
import './Carrossel.css';
import {motion} from 'framer-motion';
import book from '../Carrossel/images/book.jpg';
import makeup from '../Carrossel/images/makeup.jpg';
import iphone from '../Carrossel/images/iphone.jpg';
import rubiks from '../Carrossel/images/rubiks.jpg';


const products = [book, makeup, iphone, rubiks];

export default function Carrossel(){
    const carrossel = useRef();
    const [width, setWidth] = useState(0)

    useEffect(()=>{
        console.log(carrossel.current?.scrollWidth, carrossel.current?.offsetWidth)
        setWidth(carrossel.current?.scrollWidth - carrossel.current?.offsetWidth)
    }, [])
    return(
        <div className='Carrossel-Container'>
            <motion.div ref={carrossel} className='Carrossel' whileTap={{cursor:"grabbing"}}>
                <motion.div className='Carrossel-Slide' drag="x" dragConstraints={{right:0, left: -width}} initial={{x:100}} animate={{x:0}} transition={{duration:0.8}}>
                    {products.map(image =>(
                        <motion.div className='Carrossel-Item'key={image}>
                            <img src={image} alt="imagem"/>
                        </motion.div>
                    ) )}
                </motion.div>

            </motion.div>

        </div>
    );
}