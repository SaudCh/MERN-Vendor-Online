import React, { useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { BsPlusLg } from 'react-icons/bs'

function ImagesInput({
    images,
    setImages
}) {
    const inputRef = useRef(null)

    const validateFile = (file) => {
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    };

    const addImages = (e) => {
        const images = e.target.files

        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const fileIsValid = validateFile(image)
            if (fileIsValid) {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                    setImages((prevImages) => prevImages.concat(reader.result))
                };
            }
        }
    }

    return (
        <div className='border rounded py-4'>
            <input
                type='file'
                onChange={addImages}
                multiple
                hidden
                ref={inputRef}
                accept='image/*'
            />
            <div className='flex justify-center'>
                <button
                    className='rounded p-10 border'
                    onClick={() => inputRef.current.click()}
                    type='button'
                >
                    <BsPlusLg />
                </button>
            </div>
            <div className='flex items-center flex-wrap justify-evenly'>
                {
                    images.map((img, index) => {
                        return (
                            <div key={index} className='h-[100px] w-[100px] overflow-hidden border rounded mt-2'>
                                {/* delete button with icon from react icons */}
                                <button
                                    className='bg-red-500 text-white rounded-full p-1'
                                    onClick={() => setImages(images.filter((image) => image !== img))}
                                    type="button"
                                >
                                    <MdDelete />
                                </button>
                                <img src={img} alt='images' className='h[100px] w-[100px]' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImagesInput