import React from "react";

export const Faqs = () => {
  return (
    <div className="container">
      <h1 className="text-center m-5">FAQs</h1>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">1. What is this app about?</h2>
            </div>
            <div className="card-body">
              <p>
                This app is a platform that connects trainers and users who are
                interested in buying fitness routines.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">2. How can I register as a user?</h2>
            </div>
            <div className="card-body">
              <p>
                To register as a user, simply click on the "Sign Up" button and
                fill in your details. You can then browse the available routines
                and make a purchase.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">
                3. Can I become a trainer and sell my own routines?
              </h2>
            </div>
            <div className="card-body">
              <p>
                Yes, if you are a certified trainer, you can apply to become a
                seller on the platform. You will need to provide proof of your
                certification and create your own routines to sell.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">4. How do I purchase a routine?</h2>
            </div>
            <div className="card-body">
              <p>
                To purchase a routine, simply click on the routine you are
                interested in and follow the prompts to complete your purchase.
                You will need to provide payment information and agree to the
                terms and conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">
                5. What happens after I purchase a routine?
              </h2>
            </div>
            <div className="card-body">
              <p>
                Once you have purchased a routine, you will be able to access it
                immediately. You can view the routine and follow the
                instructions provided by the trainer.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">6. How do I communicate with my trainer?</h2>
            </div>
            <div className="card-body">
              <p>
                You can communicate with your trainer through the platform's
                messaging system. Simply click on the trainer's profile and send
                them a message.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">
                7. What if I am not satisfied with my routine?
              </h2>
            </div>
            <div className="card-body">
              <p>
                If you are not satisfied with your routine, you can contact the
                trainer to discuss your concerns. If you are still not
                satisfied, you can request a refund within a certain timeframe.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h2 className="mb-0">8. What types of routines are available?</h2>
            </div>
            <div className="card-body">
              <p>
                There are a variety of routines available, including strength
                training, cardio, yoga, and more. You can search for routines
                based on your fitness level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
