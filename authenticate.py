import os
import sys
def main():
    if sys.argv[2] == "git":
        exit_code = os.system("nuget.exe sources update -Name \"Azure\" -Username \"Azure\" -Password \"" + sys.argv[1] + "\" -StorePasswordInClearText -ConfigFile NuGet.config")
    else:
        exit_code = os.system("nuget.exe sources update -Name \"Azure\" -Username \"Azure\" -Password \"" + sys.argv[1] + "\" -StorePasswordInClearText -ConfigFile " + os.path.join(os.environ['APPDATA'], "Nuget", "NuGet.config"))
    if exit_code != 0:
        os.system("nuget.exe sources add -Name \"Azure\" -Username \"Azure\" -Password \""+sys.argv[1]+"\" -StorePasswordInClearText -source \"https://pkgs.dev.azure.com/OutSystemsRD/_packaging/ArtifactRepository/nuget/v3/index.json\"")

if __name__== "__main__":
    main()