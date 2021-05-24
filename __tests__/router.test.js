/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';
 const num = 4;

 // use toEqual to test objects
 describe("test current state object on each call", () => {

     test("test current state object after pushing `settings` to the stack", () => {
         expect(pushToHistory("settings").state).toEqual({ page: 'settings' });
    });

     test("test current state object after pushing `entry` to the stack", () => {
        expect(pushToHistory("entry", num).state).toEqual({ page: `entry${num}` });
    });

     test("test current state object after default call to the function", () => {
        expect(pushToHistory("xyz").state).toEqual({});
    });
 });

 
 // use toBe to test equality
 describe("test length of the stack on each function call", () => {
    test("test length of stack after pushing `settings` to the stack", () => {
        expect(pushToHistory("settings").length).toBe(5);
    });

    test("test length of stack after pushing `entry` to the stack", () => {
        expect(pushToHistory("entry", num).length).toBe(6);
    });

    test("test length of stack after default call to the function", () => {
        expect(pushToHistory("xyz").length).toBe(7);
    });
 });

