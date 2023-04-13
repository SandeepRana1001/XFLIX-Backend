import './App.css';
import {  useState } from 'react';
import Header from './master/header'
import Dashboard from './components/dashboard/dashboard';
import Filter from './components/shared/filter/filter';
import { Route, Switch } from 'react-router-dom';
import Video from './components/video/video';
import UploadModal from './components/shared/uploadModal/uploadModal';



const App = () => {

  const [filter, setFilter] = useState([])
  const [sort, setSort] = useState(null)
  const [ageGroup, setAgeGroup] = useState('all')
  const [hideSearch,setHideSearch] = useState(false)
  const [searchValue , setSearchValue] = useState(null)
  const [uploadValue,setUploadValue] = useState({})

  const getFilter = (curr, isChecked) => {
    if (isChecked) {
      setFilter([...filter, curr])
    } else {
      const arr = filter.filter(element => element !== curr);
      setFilter([...arr])
    }
    console.log(filter)
  }

  const getSort = (val) => {
    setSort(val)
  }

  const handleAgeGroup = (age) => {
    if(!age){
      age='Anyone'
    }
    setAgeGroup(age)
  }

  const hideDataFromSearch = (val)=>{
    setHideSearch(val)
  }

  const getSearchValue = (value)=>{
    if(!value){
      value = null
    }
    setSearchValue(value)
  }

  const getUploadValue = (value)=>{
    setUploadValue(value)
  }
  
  return (
    <div className="App">
      <Header getFilter={getFilter} getSort={getSort} handleAgeGroup={handleAgeGroup} hideSearch={hideSearch} getSearchValue={getSearchValue}/>
      <UploadModal getUploadValue={getUploadValue}/>
      <Switch>
        <Route exact path={'/'}>
          <Filter getFilter={getFilter} getSort={getSort} handleAgeGroup={handleAgeGroup} />
          <Dashboard filter={filter} sort={sort} ageGroup={ageGroup} hideDataFromSearch={hideDataFromSearch} searchValue={searchValue}   
            uploadValue={uploadValue}
          />
        </Route>
        <Route exact path={`/video/:videoId`}>
          <Video  hideDataFromSearch={hideDataFromSearch} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
