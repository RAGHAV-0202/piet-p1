import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
function Error() {

    React.useEffect(() => {
        document.title = 'Error 404';
    }, []);

    return (
        <div className="h-screen w-screen bg-gray-950 flex flex-col items-center justify-center text-white relative overflow-hidden gap-5">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-800/10 via-transparent to-black"></div>

            {/* Animated 404 Text */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-9xl font-extrabold text-blue-500 neon-glow"
            >
                404
            </motion.h1>

            {/* Error Message */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-300 mt-4"
            >
                Oops! The page you're looking for doesn't exist.
            </motion.p>

            {/* Home Button with Glassmorphism */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
            >
                <Link 
                    style={{padding  : "10px"}}
                    to="/"
                    className="mt-6 px-8 py-3 text-lg font-medium bg-white/10 backdrop-blur-lg text-white rounded-lg shadow-lg hover:bg-white/20 transition duration-300 border border-white/20"
                >
                    Go Back Home
                </Link>
            </motion.div>

            {/* Hidden Easter Egg: Developer Credit */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-4 text-sm text-gray-100 hidden sm:block"
            >
                Developed with 💙 by <span className="text-white">Raghav</span>
            </motion.p>

            {/* Floating Effects */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-48 h-48 bg-blue-500/20 blur-3xl rounded-full top-10 left-10"
            ></motion.div>

            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-48 h-48 bg-blue-700/20 blur-3xl rounded-full bottom-10 right-10"
            ></motion.div>
        </div>
    );
}

export default Error;
