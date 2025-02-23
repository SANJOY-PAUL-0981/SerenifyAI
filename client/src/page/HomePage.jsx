import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


function HomePage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-40">
                <div className="w-[60vw] text-center pt-40">
                    <h1 className="font-bold text-5xl">Your Caring AI Mental Health Companion</h1>
                    <p className="text-xl">A safe, judgment-free space to share your thoughts and feelings. Available 24/7 to listen and support you on your mental wellness journey.</p>
                    <Link to="/ChatPage"><button className="bg-[#A9B5DF] hover:bg-[#95a9f4] p-2 text-lg text-white rounded">Start Talking Now!<i className="fa-solid fa-arrow-right"></i></button></Link>
                </div>

                <div className="flex justify-between gap-10 px-10">
                    <div className="border-[3px] border-[#A9B5DF] rounded-xl p-3 w-[28vw]">
                        <i className="fa-regular fa-heart border p-3 rounded-full text-xl text-white bg-[#A9B5DF]"></i>
                        <h1 className="text-2xl font-bold">Compassionate Support</h1>
                        <p>Receive empathetic, non-judgmental support whenever you need it</p>
                    </div>
                    <div className="border-[3px] border-[#A9B5DF] rounded-xl p-3 w-[28vw]">
                        <i className="fa-regular fa-clock border p-3 rounded-full text-xl text-white bg-[#A9B5DF]"></i>
                        <h1 className="text-2xl font-bold">24/7 Availability</h1>
                        <p>Access support anytime, day or night, whenever you need someone to talk to</p>
                    </div>
                    <div className="border-[3px] border-[#A9B5DF] rounded-xl p-3 w-[28vw]">
                        <i className="fa-regular fa-comment border p-3 rounded-full text-xl text-white bg-[#A9B5DF]"></i>
                        <h1 className="text-2xl font-bold">Easy Communication</h1>
                        <p>Chat naturally and get responses that understand your needs</p>
                    </div>
                </div>

                <div className="text-center w-[90vw] border rounded-xl p-10 h-[40vh] flex flex-col justify-center items-center gap-5 text-white bg-[#A9B5DF]">
                    <h1 className="text-4xl font-bold">Ready to Take the First Step?</h1>
                    <p className="text-lg">Starting is often the hardest part. Our AI companion is here to listen without judgment and help you navigate your feelings in a safe, supportive environment.</p>
                    <button className="bg-white text-[#A9B5DF] text-xl p-2 w-[10vw] font-semibold rounded-lg">SignUp</button>
                </div>

                <div className="w-[60vw] text-center pb-10">
                    <p>This AI companion is not a replacement for professional mental health services. If you're experiencing a crisis or need immediate help, please contact your local emergency services or mental health crisis hotline.</p>
                </div>
            </div>
        </>
    )
}

export default HomePage;