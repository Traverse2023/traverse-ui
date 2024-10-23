import { motion } from "framer-motion";

const Loading = () => {
    return ( 
        <div className="h-screen w-full bg-vanilla flex flex-col justify-center items-center">
            <motion.div
                variants={{
                    hidden: { rotate: 0 },
                    visible: { rotate: 720 }
                    }}
                    initial= "hidden"
                    animate= "visible"
                    transition={{duration: 4, delay: 0.5}}
            >
                <img className="scale-[2]" src="/public/imgs/logo.svg"/>
            </motion.div>

            <div className="mt-24 w-1/2 h-8 rounded-3xl border-gray-400">
                <motion.div 
                    className="w-1 h-full bg-honey rounded-3xl"
                    variants={{
                    hidden: {width: '0%'},
                    visible: {width: '100%'}
                    }}
                    initial= "hidden"
                    animate= "visible"
                    transition={{duration: 5, delay: 0.5, ease: [0.2, 0, 0.2, 1]}}
                >
                </motion.div>
            </div>
        </div>
     );
}
 
export default Loading;