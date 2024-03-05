import HomeLayout from "../Layouts/HomeLayout";

function Signup() {
    return(
        <HomeLayout>
            <div className=" flex overflow-x-auto items-center justify-center h-[100]">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className=" text-center text-2xl font-bold">Registration Page</h1>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;