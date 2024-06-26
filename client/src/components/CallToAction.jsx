import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about my Projects?
            </h2>
            <p className='text-gray-500 my-2'>
                Go to my GitHub Profile on the button below 
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/Jennydunix" target='_blank' rel='noopener noreferrer'>
                    Jennifer&apos;s GitHub Profile
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKgKfrtGPzlaZE7kuvgErFGxZlMZiIwS8wg&s" />
        </div>
    </div>
  )
}