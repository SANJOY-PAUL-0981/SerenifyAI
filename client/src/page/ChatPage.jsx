import Navbar from "../components/Navbar";

function ChatPage() {
    return (
        <>
            <Navbar />
            <div className="h-[89vh] flex justify-center items-center">
                <div className="border w-[55vw] rounded-xl">
                    <div className="p-2">
                        <h1 className="text-2xl font-bold pb-2">Mental Health Assistant</h1>
                        <p>A safe space to talk about your feelings and get support. Everything you share is private and confidential.</p>
                    </div>

                    <div>
                        <div className="h-[60vh] px-5 py-10 border-b-[1px] border-t-[1px]">
                            <div className="flex justify-center">
                                <p>👋 Hello! I'm here to listen and support you. How are you feeling today?</p>
                            </div>
                        </div>
                        <div className="p-3 flex gap-3">
                            <input type="text" className="border h-12 rounded p-2 w-[50vw]" placeholder="Share hoe you're feeling...."/>
                            <button className="border rounded-md p-3 px-4 flex justify-center items-center"><i className="fa-regular fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;