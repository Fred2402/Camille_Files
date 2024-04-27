##
# \\Author: Thibault Napoléon "Imothep"
# \\Company: ISEN Yncréa Ouest
# \\Email: thibault.napoleon@isen-ouest.yncrea.fr
# \\Created Date: 23-Jan-2024 - 12:04:19
# \\Last Modified: 23-Jan-2024 - 14:37:09
##

#-------------------------------------------------------------------------------
#--- Create database and add user ----------------------------------------------
#-------------------------------------------------------------------------------
CREATE DATABASE comweb_project;
USE comweb_project;
CREATE USER 'comweb_project'@'localhost' IDENTIFIED BY 'tcejorp_bewmoc_isen29';
grant ALL PRIVILEGES ON comweb_project.* TO 'comweb_project'@'localhost';
FLUSH PRIVILEGES;
