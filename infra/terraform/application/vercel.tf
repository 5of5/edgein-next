data "vercel_project" "edgein" {
  name = "edgein"
}

data "vercel_project_directory" "edgein" {
  path = "../../"
}

resource "vercel_deployment" "edgein" {
  project_id  = data.vercel_project.edgein.id
  files       = data.vercel_project_directory.edgein.files
  path_prefix = data.vercel_project_directory.edgein.path

  production  = false
  delete_on_destroy = true

environment = {
    FOO = "bar"
  }
}
