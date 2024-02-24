from flask import Flask, jsonify, request
from db import Connection
from utils import makeJobId

app = Flask(__name__)
db = Connection('TechJobDB')

@app.get("/allJobData")
def get_jobs():
    jobs = db.job_data.find()
    return list(jobs)

@app.post("/insertJobData")
def post_job():
    job = dict(request.json)
    job.update({
        "_id": makeJobId(24),
        "education_preferred": request.body.education_preferred,
        "years_experience": request.body.years_experience,
        "languages": request.body.languages,
        "frameworks": request.body.frameworks,
        "tools": request.body.tools,
        "databases": request.body.databases,    
        "site_name": request.body.site_name,
        "company_name": request.body.company_name,
        "address": request.body.address,
        "city": request.body.city,
        "link": request.body.link
    })

    result = db.job_data.insert(job)
    if not result.inserted_id:
        return {
            "message": "Failed to insert job"
        }, 500
    
    return {
        "message": "Job successfully inserted",
        "data": {
            "_id": result.inserted_id
        }
    }, 200

@app.get("/commonLanguages")
def get_common_lang():
    languages = []
    response = []
    jobs = db.job_data.find()

    for job in jobs:
        for lang in job['languages']:
            languages.append(lang)

    for lang in languages:
        lang_count = languages.count(lang)
        response.append({
            'lang': lang,
            'num': lang_count
        })

    response = [dict(t) for t in {tuple(d.items()) for d in response}]

    return response
    

if __name__ == "__main__":
    app.run(port=8887, debug=True)
