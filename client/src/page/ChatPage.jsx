import Navbar from "../components/Navbar";

function ChatPage() {
    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h1>Mental Health Assistant</h1>
                    <p>A safe space to talk about your feelings and get support. Everything you share is private and confidential.</p>
                </div>

                <div>
                    <div>
                        <p>👋 Hello! I'm here to listen and support you. How are you feeling today?</p>
                    </div>
                    <div>
                        <input type="text" className="border border-black"/>
                        <button><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;