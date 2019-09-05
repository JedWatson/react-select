#tool "nuget:?package=Microsoft.TestPlatform&version=15.7.0"
#addin "Cake.Npm"

////////////////////////////////////////////////////////////////
// Use always this structure. If you don't need to run some   //
// task, comment the code inside it.                          //
////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release"); //Here you can configure if you want do debug or release

var install=Task("Install")
    .Does(() =>
{
    Information("Starting Install");
    NpmInstallSettings settings = new NpmInstallSettings();
    Uri repo = new Uri("https://pkgs.dev.azure.com/OutSystemsRD/_packaging/ArtifactRepository/npm/registry/");
    settings.Registry = repo;
    NpmInstall();      
    Information("Ending Install");
});

var tests = Task("Tests")
	.Does(()=>
	{	
        Information("Starting Tests");
		//NpmRunScript(); //define test script. If you don't have, comment this line
        Information("Ending Tests");
	});

var package = Task("Package")
    .Does(()=>
    {
        Information("Starting Pack");
        CreateDirectory("./artifacts");
        MoveFileToDirectory(@"./package.json", @"./artifacts/");
        Information("Ending Pack");
    });

Task("Default")
    .IsDependentOn("Package");

RunTarget(target);