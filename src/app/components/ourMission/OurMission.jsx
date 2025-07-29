import React from 'react'
import "./ourmission.css"

const OurMission = () => {

    return (
        <div className='services'>
            <div className='services-header'>
                <h6>- Services For Elderly</h6>
                <h1>We take Best Care For Their Well-Being</h1>
            </div>

            <div className="service-cards-cont">

                <div className="service-card">
                    <div className="service-card-image">
                        <img src="/assets/services/accommodation.webp" alt="" />
                    </div>
                    <div className='service-card-detail'>
                        <div className="service-card-head">
                            <h5>Accommodation</h5>
                        </div>
                        <div className="service-card-text">
                            <ul>
                                <li><span>Comfortable Rooms:</span> Spacious and well-maintained rooms for a peaceful living environment.</li>
                                <li><span>Personalized Care:</span> Individualized care plans to meet the unique needs of each resident.</li>
                                <li><span>24/7 Assistance:</span> Round-the-clock support and assistance from our dedicated staff.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="service-card">
                    <div className="service-card-image">
                        <img src="/assets/services/healthcare_services.webp" alt="" />
                    </div>
                    <div className='service-card-detail'>
                        <div className="service-card-head">
                            <h5>Healthcare Services</h5>
                        </div>
                        <div className="service-card-text">
                            <ul>
                                <li><span>Medical Care:</span> Access to healthcare services, including regular check-ups and medication management.</li>
                                <li><span>Physical Therapy:</span> Rehabilitation services to maintain mobility and independence.</li>
                                <li><span>Dietary Support:</span> Nutritious meals tailored to the dietary needs of elderly residents.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="service-card">
                    <div className="service-card-image">
                        <img src="/assets/services/recreational_activities.webp" alt="" />
                    </div>
                    <div className='service-card-detail'>
                        <div className="service-card-head">
                            <h5>Recreational Activities</h5>
                        </div>
                        <div className="service-card-text">
                            <ul>
                                <li><span>Engaging Programs:</span> Recreational and social activities to promote mental stimulation and social interaction.</li>
                                <li><span>Arts and Crafts:</span> Creative activities to foster self-expression and enjoyment.</li>
                                <li><span>Outdoor Spaces:</span> Access to outdoor gardens and walking areas for relaxation and enjoyment.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="service-card">
                    <div className="service-card-image">
                        <img src="/assets/services/spiritual_support.webp" alt="" />
                    </div>
                    <div className='service-card-detail'>
                        <div className="service-card-head">
                            <h5>Spiritual Support</h5>
                        </div>
                        <div className="service-card-text">
                            <ul>
                                <li><span>Spiritual Guidance:</span> Access to spiritual resources and support for residents' spiritual well-being.</li>
                                <li><span>Prayer Services:</span> Regular prayer services and spiritual gatherings for those who wish to participate.</li>
                                <li><span>Counseling Services:</span> Emotional and spiritual counseling for residents facing difficult times.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default OurMission