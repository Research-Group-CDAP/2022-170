# Get conda image
FROM continuumio/miniconda3:latest

# Set workdir
WORKDIR /app

# Copy env.yml to current directory
COPY environments.yaml.yml .

# Create conda environment using env.yml
RUN conda env create -f environments.yml

# Copy all files after to avoid rebuild the conda env each time
COPY . /app/

RUN echo "source activate reslience" > ~/.bashrc

# activate the myapp environment
ENV PATH /opt/conda/envs/reslience/bin:$PATH

#set python path
#ENV PYTHONPATH "${PYTHONPATH}:centrality/centrality_functions.py"
#ENV PYTHONPATH "${PYTHONPATH}:centrality/run_centrality.py"

#expose port 5000
EXPOSE 5000

# Launch the API
CMD ["bash", "-c", "python api_server/app.py"]

