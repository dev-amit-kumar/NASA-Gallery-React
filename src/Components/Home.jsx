import React from 'react'
const today_date = new Date()
const month = today_date.getMonth()+1
var curr = today_date.getFullYear() + '-' + month + '-' + today_date.getDate()
const nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=Z1GIRvQPk9eTsR68KiZVHXf9tsnTXIPurXUeiJqV&date='

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            mediaUrl : '',
            isLoaded : false,
            date: curr,
            mediaType: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.setState({
            mediaUrl: '',
            mediaType: ''
        })
        this.changemediaUrl()
    }

    changemediaUrl(){
        fetch(nasa_url+this.state.date,{method: 'GET'})
        .then(res => res.json())
        .then(data => this.setState({
            mediaUrl: data.url,
            mediaType: data.media_type
        }))
    }

    componentDidMount(){
        this.changemediaUrl()
    }

    render(){
        var media = ''
        if(this.state.mediaType === 'video'){
            media = <iframe 
            src={this.state.mediaUrl} 
            title="video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen></iframe>
        }
        else{
            media = <img src={this.state.mediaUrl} alt="Nasa"/>
        }
        if(this.state.mediaUrl){
            return(
                <>
                    <nav className="navbar navbar-dark bg-dark">
                        <label className="navbar-brand">NASA</label>
                        <form className="form-inline" onSubmit={this.submitHandler}>
                            <input className="form-control mr-sm-2" type="date" max={curr} value={this.state.date} onChange={this.changeHandler}/>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Update</button>
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