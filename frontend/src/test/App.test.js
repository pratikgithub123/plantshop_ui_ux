import axios from "axios";
import create_product_mock from "../mock/create_product_mock";
import get_product_mock from "../mock/get_product_mock";
import get_users_mock from "../mock/get_users_mock";
import login_mock from "../mock/login_mock";
import register_mock from "../mock/register_mock";
const backendURL = 'http://localhost:5000'

describe('App Testing', () => {

      //Login Test 
      it('POST /api/user/login | Login Successfull', async () => {
        const response = await axios.post(`${backendURL}/api/user/login`, login_mock)
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true)
        expect(response.data.token).toBeDefined();
      })

            //Register test
      it('POST /api/create | Register Successfull', async () => {
        const response = await axios.post(`${backendURL}/api/user/create`, register_mock)
        expect(response.status).toBe(200);
      })

      it('GET /api/product/get_products | Should Work', async () => {
        const response = await axios.get(`${backendURL}/api/product/get_products`, get_product_mock)
        expect(response.status).toBe(200)
      })
      it('GET /api/user/get_users | Should Work', async () => {
        const response = await axios.get(`${backendURL}/api/user/get_users`, get_users_mock)
        expect(response.status).toBe(200)
      })

     
  it('POST /api/product/create_product | Should Work', async () => {
    const response = await axios.post(`${backendURL}/api/product/create_product`, create_product_mock);
    console.log(response)
    console.log(response.status)
  })
 
       
})


    

    