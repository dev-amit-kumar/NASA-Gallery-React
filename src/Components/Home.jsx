import React from 'react'
const today_date = new Date()
const month = today_date.getMonth()+1
var curr = today_date.getFullYear() + '-' + month + '-' + (today_date.getDate()-1)
const nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=Z1GIRvQPk9eTsR68KiZVHXf9tsnTXIPurXUeiJqV&date='
class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            data : '',
            date: curr
        }
    }

    changeHandler = (e) => {
        this.setState({
            date: e.target.value,
            data: ''
        })
        this.changeNasaData(e.target.value)
    }

    changeNasaData(date){
        fetch(nasa_url+date,{method: 'GET'})
        .then(res => res.json())
        .then(data => this.setState({
            data: data
        }))
    }

    componentDidMount(){
        this.changeNasaData(curr)
    }

    render(){
        var media = ''
        if(this.state.data.media_type === 'video'){
            media = <iframe 
            src={this.state.data.url} 
            title="video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen></iframe>
        }
        else{
            media = <img className="nasa-image" src={this.state.data.hdurl} alt="Nasa"/>
        }
        if(this.state.data.media_type){
            return(
                <>
                    <nav className="navbar sticky-top">
                        <a class="navbar-brand" href="#">
                            <img className="logo" src='https://dl.dropboxusercontent.com/s/yudlkrxyr11u73t/logo.png?dl=0' alt="logo"/>
                        </a>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="date" max={curr} value={this.state.date} onChange={this.changeHandler}/>
                        </form>
                    </nav>
                    {media}
                </>
            )
        }
        else{
            return(
                <div className="full-cover">
                    <div className="spinner-border text-primary" style={{width: '10rem', height: '10rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }
}

export default Home