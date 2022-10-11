# Chaos Toolkit Documentation Support Code

Support code for the [documentation](https://docs.chaostoolkit.org).

You may want to clone this repository to play with the code used in the
tutorials.

Setup Environment
---------------------------------------
pip install -U chaostoolkit
pip install chaostoolkit-kubernetes
pip install -U chaostoolkit-reporting
sudo apt-get install libcairo2-dev

Run the Experiment
----------------------------------------
chaos run randompodterm.yaml
chaos report --export-format=html5 journal.json report.html