import { Link } from "react-router-dom";
import TheSimpsonLogo from '../assets/TheSimpsonsLogo.png'
import ArgentinaLogo from '../assets/ArgentinaLogo.png'
import FoodLogo from '../assets/FoodLogo.png'

const CategoryPage = () => {

    return (
        <div className="flex justify-center">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/category/The Simpson`}>
                        <img className="rounded-t-lg" src={TheSimpsonLogo} alt="" />
                    </Link>

                    <div className="p-5 ">
                        <Link to={`/category/The Simpson`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                The Simpson
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/category/Argentina`}>
                        <img className="rounded-t-lg" src={ArgentinaLogo} alt="" />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/category/Argentina`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Argentina
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/category/Food`}>
                        <img className="rounded-t-lg" src={FoodLogo} alt="" />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/category/Food`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Food
                            </h5>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default CategoryPage;