import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage , setPreviewImage] = useState("");

    const [signupData , setSignupData] = useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    function getImage(event) {
        event.preventDefault();
        //getting image
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function () {
                
                setPreviewImage(this.result);
            })
        }
    }

    
async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      toast.error("Please fill all the details");
      return;
    }

        //cheaking name field length
        if (!signupData.fullName.length) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }

        if (!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error("Invalid email id")
        }

        //cheaking password vaiddation

        if (!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&^])[A-Za-z\d@#$!%*?&^]{8,15}$/)) {
            toast.error("At least 8 characters with uppercase, lowercase, digit, and special character")
        }

        const formData = new FormData();
        formData.append("fullName",signupData.fullName);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

        //dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success)
            navigate("/");

        

        setSignupData({
            fullName:"",
            email:"",
            password:"",
            avatar:""
        });
        setPreviewImage("");

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center gap-10 mx-16 h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-6 text-white w-96 shadow-[0_0_10px_#36454F] ">
                    <h1 className=" text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className=" cursor-pointer">
                        {previewImage ? (
                            <img className=" w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className=" w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>
                    <input
                    onChange={getImage}
                     type="file"
                     className="hidden"
                     name="image_uploads"
                     id="image_uploads"
                     accept=".jpg, .jpeg, .png, .svg"
                    />

                    <div className=" flex flex-col gap-1">
                        <label htmlFor="fullName" className=" font-semibold">Full Name </label>
                        <input
                         type="text"
                         required
                         name="fullName"
                         id="fullName"
                         placeholder="Enter Your fullName."
                         className=" bg-transparent px-2 py-1 border"
                         onChange={handleUserInput}
                         value={signupData.fullName}
                        />
                        
                    </div>
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="email" className=" font-semibold">Email </label>
                        <input
                         type="email"
                         required
                         name="email"
                         id="email"
                         placeholder="Enter Your Email."
                         className=" bg-transparent px-2 py-1 border"
                         onChange={handleUserInput}
                         value={signupData.email}
                        />
                        
                    </div>
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="password" className=" font-semibold">Password </label>
                        <input
                         type="password"
                         required
                         name="password"
                         id="password"
                         placeholder="Enter Your Password."
                         className=" bg-transparent px-2 py-1 border"
                         onChange={handleUserInput}
                        />
                        
                    </div>

                    <button type="submit" className=" mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer ">
                        Create Account
                    </button>

                    <p>
                        Already have an account ? <Link to= "/login" className=" link text-accent cursor-pointer" > Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;