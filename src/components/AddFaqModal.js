import React from 'react'
import styled from 'styled-components'

const AddFaqMain = styled.div`
    .question-heading {
        border-top: 2px solid #8a8a8a47;
        padding-top: 0.8rem;
    }
    .question-heading h5 {
        font-size: 16px;
        font-weight: 500;
    }
    .question-heading,
    .answer-heading h5 {
        font-size: 16px;
        font-weight: 500;
    }
    .question-heading,
    .answer-heading span {
        color: #ff384e;
        font-weight: 500;
    }
    textarea {
        width: 100%;
        border-radius: 10px;
        background: #191a22;
        border: 0;
        padding: 0.8rem 1rem;
        font-size: 16px;
        color: white;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
    textarea {
        color: white;
    }
    textarea:focus {
        box-shadow: none !important;
    }
    textarea:focus-visible {
        box-shadow: none !important;
        border: 0;
        outline: none;
    }
    Input {
        width: 100%;
        border-radius: 10px;
        background: #191a22;
        border: 0;
        padding: 0.8rem 1rem;
        font-size: 16px;
        color: white;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
    Input::placeholder {
        color: #8a8a8a47;
    }
    Input:focus {
        box-shadow: none !important;
    }
    Input:focus-visible {
        box-shadow: none !important;
        border: 0;
        outline: none;
    }
    .btn-main {
        display: flex;
        justify-content: center;
    }
    .save-btn {
        background-color: #ff384e;
        border: 0;
        border-radius: 12px;
        padding: 0.5rem 6rem;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        width: 60%;
        margin-bottom: 2rem;
    }
    @media (min-width: 200px) and (max-width: 480px) {
        .save-btn {
            padding: 0.5rem 2rem;
            width: 100%;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
    }
    @media (min-width: 769px) and (max-width: 1000px) {
    }
    @media (min-width: 1001px) and (max-width: 1220px) {
    }
`
export const AddFaqModal = () => {
    return (
        <AddFaqMain>
            <div className="question-heading">
                <h5>
                    Enter your questions <span>*</span>
                </h5>
                <input type="text" placeholder="Enter here" />
            </div>
            <div className="answer-heading">
                <h5>
                    Enter your answers <span>*</span>
                </h5>
                <textarea name="" id="" rows="5" />
            </div>
            <div className="btn-main">
                <button type="button" className="save-btn">
                    Save FAQ
                </button>
            </div>
        </AddFaqMain>
    )
}
