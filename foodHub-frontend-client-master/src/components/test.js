import React, { useState } from 'react';

const Test = () => {

    return (
        <>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Category</label>
                    <select id="category" >
                        <option name="select">Select</option>
                        <option name="one">test one </option>
                        <option name="two">test two </option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" />
                </div>
                <input type="button" name="submit" value="submit"/>
            </form>
        </>
    )
}

export default Test;