import re
import requests
from flask_cors import cross_origin
from requests import RequestException
from flask import Flask, jsonify, request
from flask_restplus import Api, Resource, fields
from flask import Response

# File generaion
import json
from os import listdir
from os.path import isfile, join

# Run Experiments
import subprocess

flask_app = Flask(__name__)
flask_app.config.from_pyfile('../config.py')
app = Api(app=flask_app,
          version="1.0",
          title="Chaos Server API")

name_space = app.namespace('api/v1/', description='Chaos Server API')


@cross_origin()
@name_space.route('/chaos/test', methods=["GET"])
class Dependency(Resource):
    @app.doc(responses={200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error'})
    def get(self):
        try:
            return Response("sdsds", status=200)
        except KeyError as e:
            name_space.abort(500, e.__doc__, status="Could not retrieve information", statusCode="500")
        except Exception as e:
            name_space.abort(400, e.__doc__, status="Could not retrieve information", statusCode="400")


def automation():
    with open('../pod_details.json') as f:
        data = json.load(f)
    for key in data:
        generateTestYaml(key)


def generateTestYaml(podName):
    onlyfiles = [f for f in listdir('../experimentTemplates') if isfile(join('../experimentTemplates', f))]
    for template in onlyfiles:
        generateFile(template, podName, 'http://52.170.169.174/productpage')


def generateFile(templateName, podName, hostName):
    with open('../experimentTemplates/' + templateName, 'r') as file:
        healthExp = file.read()
    podName = podName.split('-')[0]
    replacedString = healthExp.replace('${POD_NAME}', podName).replace('${HOST_URL}', hostName)
    with open('../generatedFiles/' + templateName.split('.')[0] + '_' + podName + '.yaml', "w") as generatedFile:
        generatedFile.write(replacedString)
        print(templateName, podName)
    generatedFile.close()


def runExperiments():
    experiments = [f for f in listdir('../generatedFiles') if isfile(join('../generatedFiles', f))]
    for experiment in experiments:
        try:
            runExperiment(experiment)
        except Exception as e:
            print('----------------------------------------')
            print("Experiment Failed")
            print('----------------------------------------')


def runExperiment(yaml):
    batcmd = "chaos run ../generatedFiles/" + yaml + " --journal-path ../generatedJournals/" + yaml.split('.')[0] + ".json"
    result = subprocess.check_output(batcmd, shell=True)
    print(result)

def generateReport():

    cmd = "chaos report --export-format=pdf "
    journals = [f for f in listdir('../generatedJournals') if isfile(join('../generatedJournals', f))]
    for j in journals:
        cmd += "../generatedJournals" +j + " "

    print(cmd)
    result = subprocess.check_output(cmd, shell=True)
    print(result)

if __name__ == '__main__':
    # flask_app.run(host='0.0.0.0')
     automation();
     runExperiments();
   #generateReport();
