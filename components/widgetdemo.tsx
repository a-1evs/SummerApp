export default function WeatherWidget({ tempInFahrenheit, description, time, imageURL }) {
    return (
      <div className="row justify-content-center py-5">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card rounded-3">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="mb-0">Warsaw</h6>
                <h6>{time}</h6>
              </div>
  
              <div className="text-center mt-4 mb-3">
                <h2 className="display-4 font-weight-bold">{tempInFahrenheit}°C</h2>
                <span className="small text-muted">{description}</span>
              </div>
  
              <div className="d-flex justify-content-between">
                <div className="flex-grow-1">
                  <div><i className="fas fa-wind me-1"></i> <span className="me-2">40 km/h</span></div>
                  <div><i className="fas fa-tint me-1"></i> <span className="me-2">84%</span></div>
                  <div><i className="fas fa-sun me-1"></i> <span className="me-2">0.2h</span></div>
                </div>
                <div>
                  <img src={imageURL} alt="weather-icon" width="100px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  