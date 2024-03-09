import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const allBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        allBooks();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Book Shop</h1>
            <div className='books'>
                {books.map((book) => (
                    <div className='book' key={book.id}>
                        {book.cover && <img src={book.cover} />}
                        <h2 style={{marginBottom: '-1px'}}>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <div style={{ display: 'flex', gap: '13px', marginTop: '10px' }}>
                            <button className='delete' onClick={() => handleDelete(book.id)}>delete</button>
                            <button className='update'>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={`update/${book.id}`}>update</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button style={{ marginTop: '40px', padding: '10px', backgroundColor: '#555', fontSize:'16px', borderRadius: '8px', border: 'none', textDecoration: '' }}>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/add">Add New Book</Link>
            </button>
        </div>
    )
}

export default Books