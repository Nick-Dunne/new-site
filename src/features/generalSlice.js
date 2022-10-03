import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    //лоадинги добавил даже не для скелетонов, а просто чтобы не было ошибок
    loadingBorts:{},
    loadingCatOfIngred:{},
    loadingIngr:{},
    //лоадинги, как уже написано, для проверок. Но, по сути, я мог проверять просто на наличие свойств в обїектах и тогда уже что-то делать...

    borts:{},
    catOfIngred: {},
    ingr: {},
    pizzas: [],
    pizzaLoadingStatus: 'loading',
    //ниже свойство отвечает за вызов модального окна БУЛИН
    modify: false,
    //сюда будет передаваться АЙДИ пиццы, которую будем модифицировать, чтобы уже потом работать с необходимым объектом пиццы из БД
    modifyId: null
}
/* https://my-json-server.typicode.com/nick-dunne/test-deploy/pizzas */
//выносим логику за пределы View. Делаем запрос на сервер для получения контента - пицц и ниже ингредиентов.
//к слову, в этих асинхронных ТХАНКАХ можно вызывать ДИСПАТЧ (взаимосвязь с другими срезами-слайсами)
export const fetchPizza = createAsyncThunk(
    //ниже название среза/название экшена
    'general/fetchPizza',
    async ({filter, sorting})=>{
        const baseSorting = sorting ? '_sort=' + sorting.cat + '&_order=' + sorting.order : '';
        const baseFilter = filter ? 'q=' + filter + '&' : '';
       const response = await fetch('https://my-json-server.typicode.com/nick-dunne/test-deploy/pizzas?'+ baseFilter + baseSorting)
     
       //тут тоже сделал проверку на ок не ок. Обычно не ок, когда адрес другой. Кетч ловит ошибки соединения, в своб очередь... Кстати, второй then реакт не давал мне сделать, поэтому все сделал в одном.
        .then(res=>{
            if(!res.ok){throw new Error('error')}
            return res.json()})
        //ниже сделали КЕТЧ, потому что без него у промиса ниже не случится РЕДЖЕКТЕД (главное выбрасывать ошибку)
        .catch(e => {throw new Error('Ошибка fetch pizzas')})
   
        return response;
    }
) 

export const fetchBorts = createAsyncThunk(
    'general/fetchBorts',
    async ()=>{
        const response = await fetch('https://my-json-server.typicode.com/nick-dunne/test-deploy/borts')
        .then(res=>{
            if(!res.ok){throw new Error('error')}
            return res.json()})
        .catch(e=>{throw new Error('Ошибка fetch borts')})
       
        return response;
    }
)

export const fetchIngr = createAsyncThunk(
    'general/fetchIngr',
    async ()=>{
        const response = await fetch('https://my-json-server.typicode.com/nick-dunne/test-deploy/ingr')
        .then(res=>{
            if(!res.ok){throw new Error('error')}
            return res.json()})
        .catch(e=>{throw new Error('Ошибка fetch ingr')})
       
        return response;
    }
)
export const fetchCatOfIngred = createAsyncThunk(
    'general/fetchCatOfIngred',
    async ()=>{
        const response = await fetch('https://my-json-server.typicode.com/nick-dunne/test-deploy/catOfIngred')
        .then(res=>{
            if(!res.ok){throw new Error('error')}
            return res.json()})
        .catch(e=>{throw new Error('Ошибка fetch catOfIngred')})
       
        return response;
    }
)

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
    goModify: (state, action)=>{
        //принципы иммутабельности можем не соблюдать, потому что помогает встроенный ИММЕР
        //action.payload - это полезная нагрузка, все, что передается при диспатчинге экшена
        state.modify = !state.modify;
        state.modifyId = action.payload;
    }
    },
    //для проработки асинхронных экшенов и нужен экстраредъюсер
    //синтаксис любопытный
    extraReducers: (builder) =>{
        builder
        .addCase(fetchBorts.pending, state => {state.loadingBorts = 'loading'})
        .addCase(fetchBorts.rejected, state => {
            state.loadingBorts = 'error'
        })
        .addCase(fetchBorts.fulfilled, (state, action)=>{
            state.borts = action.payload;
            state.loadingBorts = 'ok'
        })
        //
        .addCase(fetchCatOfIngred.pending, state => {state.loadingCatOfIngred = 'loading'})
        .addCase(fetchCatOfIngred.rejected, state => {
            state.loadingCatOfIngred = 'error'
        })
        .addCase(fetchCatOfIngred.fulfilled, (state, action) => {
            state.catOfIngred = action.payload;
            state.loadingCatOfIngred = 'ok'
        })
        //
        .addCase(fetchIngr.pending, state => {state.loadingIngr = 'loading'})
        .addCase(fetchIngr.rejected, state => {
            state.loadingIngr = 'error'
        })
        .addCase(fetchIngr.fulfilled, (state, action)=>{
            state.ingr = action.payload;
            state.loadingIngr = 'ok'
        })
        //все, что выше - статусы лоадингов - мне нужны для проверок. Я провожу вычисления с данными, пожтому если они не появляются - будут ошибки.
        //ниже логика элегантнее, тут и скелетон и текст ошибки внутри.
        .addCase(fetchPizza.pending, state => {state.pizzaLoadingStatus = 'loading'})
        .addCase(fetchPizza.rejected, state => {
            state.pizzaLoadingStatus = 'error'
        })
        .addCase(fetchPizza.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.pizzaLoadingStatus = 'idle';
        })
    }
})

//экспортируем обычные экшены
export const {goModify} = generalSlice.actions;

//ниже экспортируем редъюсер, чтобы использовать его для формирования стора
export default generalSlice.reducer;