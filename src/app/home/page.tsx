"use client";
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home() {
    const [data, setData] = useState(null);

    const genres = {
        '6014': '游戏',
        '6016': '娱乐',
        '6004': '体育'
    }

    function genresConvert(key) {
        return genres[key] || key
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8090/appstore/price/getCurrentDiscounts'); // 请求后端接口
                const result = await response.data;
                console.log(result)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    let count = 1;


    return (
        <div className="grid-rows-[20px-1fr-20px] items-start justify-items-center min-h-screen px-4 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/*<div className="px-4 py-5 bg-gray-50 rounded-lg">
                <h1 className="text-lg font-semibold text-gray-800">App Store每日限免应用</h1>
            </div>*/}
            { data ? (
                <div className="bg-blue-300 rounded-lg shadow-sm">
                    {
                        data.map(item => (
                        <div key={item.id} className="border-b border-gray-100 last:border-0">
                            <div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors bg-amber-50">
                                {/*<div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                                    <span className="text-sm font-medium text-gray-600">{count++}</span>
                                </div>*/}
                                <img className="h-16 aspect-square mr-3" src={item.icon} alt="App Icon"/>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <a className="text-base font-medium text-gray-900 truncate" target='_blank'
                                           href={item.url}>{item.title}</a>
                                        <div className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                            {item.genres}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <span className="line-through">￥{item.price.toFixed(2)}</span>
                                        <span className="ml-2 text-red-500">
                                            ￥{item.discounts.toFixed(2)}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{item.description.slice(0, 30)}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            ) : (<p>今日无限时免费应用</p>)
            }

        </div>
    );
}