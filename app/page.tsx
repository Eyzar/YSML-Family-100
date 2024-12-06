'use client';
import React, { useState } from 'react';
import styles from '@/app/home.module.css';


export default function Page() {
  // Define three different themes, each with a question and corresponding answers
  const themes = [
    {
      name: 'Soal 1',
      question: '10 Kitab Alkitab Yang Paling Sering Dibaca',
      answers: [
        { value: 'Mazmur', score: '30', isTrue: false },
        { value: 'Yohanes', score: '28', isTrue: false },
        { value: 'Kejadian', score: '26', isTrue: false },
        { value: 'Matius', score: '25', isTrue: false },
        { value: 'Amsal', score: '21', isTrue: false },
        { value: 'Roma', score: '18', isTrue: false },
        { value: 'Yesaya', score: '15', isTrue: false },
        { value: 'Kisah Para Rasul', score: '13', isTrue: false },
        { value: 'Lukas', score: '10', isTrue: false },
        { value: 'Wahyu', score: '7', isTrue: false },
      ]
    },
    {
      name: 'Soal 2',
      question: 'Top 6 Kado Natal Terbaik',
      answers: [
        { value: 'Kartu Hadiah', score: '30', isTrue: false },
        { value: 'Pakaian', score: '26', isTrue: false },
        { value: 'Aksesoris', score: '23', isTrue: false },
        { value: 'Cokelat', score: '21', isTrue: false },
        { value: 'Kue', score: '18', isTrue: false },
        { value: 'Buku', score: '15', isTrue: false },
      ]
    },
    {
      name: 'Soal 3',
      question: 'Top 10 Tokoh Alkitab',
      answers: [
        { value: 'Yesus', score: '30', isTrue: false },
        { value: 'Musa', score: '28', isTrue: false },
        { value: 'Daud', score: '25', isTrue: false },
        { value: 'Abraham', score: '23', isTrue: false },
        { value: 'Paulus', score: '20', isTrue: false },
        { value: 'Ayub', score: '18', isTrue: false },
        { value: 'Petrus', score: '16', isTrue: false },
        { value: 'Nuh', score: '14', isTrue: false },
        { value: 'Salomo', score: '12', isTrue: false },
        { value: 'Yusuf', score: '10', isTrue: false },
      ]
    },
    {
      name: 'Soal 4',
      question: 'Hewan yang ada di alkitab',
      answers: [
        { value: 'Keledai', score: '30', isTrue: false },
        { value: 'Domba', score: '28', isTrue: false },
        { value: 'Singa', score: '25', isTrue: false },
        { value: 'Merpati', score: '23', isTrue: false },
        { value: 'Ular', score: '20', isTrue: false },
        { value: 'Ikan', score: '18', isTrue: false },
        { value: 'Lembu', score: '16', isTrue: false },
        { value: 'Rajawali', score: '14', isTrue: false },
        { value: 'Lembu', score: '12', isTrue: false },
        { value: 'Ayam', score: '10', isTrue: false },
      ]
    }
  ];

  const [selectedTheme, setSelectedTheme] = useState(themes[0]); // Default to the first theme
  const [inputValue, setInputValue] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [chances, setChances] = useState(3); // Start with 3 chances
  const [wrongAttempts, setWrongAttempts] = useState(0); // Track wrong answers
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal open state

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isAnswerCorrect = false;

    const updatedAnswers = selectedTheme.answers.map(ans => {
      if(!ans.isTrue){
        if (ans.value.toLowerCase() === inputValue.toLowerCase()) {
          setTotalScore(prevScore => prevScore + parseInt(ans.score)); // Add the score if correct
          isAnswerCorrect = true;
          return { ...ans, isTrue: true }; // Mark the answer as correct
        }else if(ans.value.toLowerCase().includes(inputValue.toLowerCase()) && inputValue.length > 3){
          setTotalScore(prevScore => prevScore + parseInt(ans.score)); // Add the score if correct
          isAnswerCorrect = true;
          return { ...ans, isTrue: true }; 
        }
      }
      
      return ans;
    });

    if (!isAnswerCorrect) {
      setChances(prevChances => prevChances - 1); // If wrong, reduce chances
      setWrongAttempts(prev => prev + 1); // Track wrong attempts
    }

    setSelectedTheme({ ...selectedTheme, answers: updatedAnswers }); // Update the answers
    setInputValue(''); // Clear input after submission
  };

  const revealNextAnswer = () => {
    const nextIndex = selectedTheme.answers.findIndex((ans) => !ans.isTrue); // Find the first unrevealed answer
  if (nextIndex !== -1) { // Ensure there's an unrevealed answer
    const updatedAnswers = [...selectedTheme.answers];
    updatedAnswers[nextIndex].isTrue = true; // Reveal the answer
    setSelectedTheme({ ...selectedTheme, answers: updatedAnswers }); // Update state
  }
  };
  // Handle theme change
  const handleThemeChange = (index: number) => {
    setSelectedTheme(themes[index]);
    setTotalScore(0); // Reset total score
    setChances(3); // Reset chances
    setWrongAttempts(0); // Reset wrong attempts
  };

  return (
    <main 
      className='flex min-h-screen flex-col p-6'
      style={{
        backgroundImage: "url('/lampu.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Theme Selector */}

      <div>
      {/* Only render modal if it's open */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" 
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          <div 
            className='left-1/2 top-1/2 -mt-12 -ml-52 text-center absolute bg-white rounded-md border border-black z-50' 
          >
              <div className='w-96 p-8 pointer-events-none'>
                <h1 className='text-2xl text-yellow-400 mb-4 font-bold'>YSML Family 😍<span className='text-red-600'>❤❤❤</span>😍</h1>
                <h2 className="text-blue-500 font-bold text-2xl">Mulai Kuis</h2>
              </div>
          </div>
        </div>
      )}

    </div>
  

      <div className='flex justify-center mb-4'>
        {themes.map((theme, index) => (
          <button 
            key={index} 
            onClick={() => handleThemeChange(index)}
            disabled={chances > 0}
            className={`mx-2 px-4 py-2 ${selectedTheme.name === theme.name ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <div className='flex-1 justify-center break-words max-h-12'>
        <p className='font-semibold text-3xl text-center text-black'>{isModalOpen ? ' ':selectedTheme.question}</p>
        <div className="mt-2 flex justify-center space-x-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              {index < wrongAttempts && <span className="text-red-700 text-3xl font-bold">X</span>}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 p-12 h-[520px]  grid grid-cols-2 gap-2'>
        {selectedTheme.answers.map((ans, index) => (
          <div key={index} className={styles.answerContainer}>
            <div className={styles.answerValue}>
              <p className={`text-xl text-center self-center`}>
                {ans.isTrue ? ans.value : ''}
              </p>
            </div>
            <div className={styles.scoreValue}>
              <p>{ans.isTrue ? ans.score : '0'}</p>
            </div>
          </div>
        ))}
      </div>

      <form className='inline-block mx-auto' onSubmit={submitHandler}>
        <label htmlFor="answer" className='text-black mr-8'>Answer: </label>
        <input
          type="text"
          id="answer"
          className='text-black py-2 text-2xl px-3'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" disabled={chances === 0} className='bg-blue-500 p-2 rounded-md mx-4'>Submit</button>
        
        <button onClick={revealNextAnswer} className={`bg-green-500 p-2 rounded-md ${chances <= 0 ? 'visible': 'hidden'}`}>Reveal</button>
      </form>

      {/* Display the total score */}
      <div className={styles.totalScore}>
        <p className='text-center py-7 font-extrabold'>{totalScore}</p>
      </div>
      {chances === 0 && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" onClick={() => setChances(-1)}>
        <div className='left-1/2 top-1/2 -mt-12 -ml-52 text-center absolute z-50 bg-white rounded-md border border-black'>
          {/* If chances are 0, display a game over message */}
          
            <div className='w-96 p-8'>
              <h2 className="text-red-500 font-bold text-3xl">Yah Kalah🤣🤣</h2>
            </div>
          
        </div>
      </div>
  )}
    </main>
  );
}
