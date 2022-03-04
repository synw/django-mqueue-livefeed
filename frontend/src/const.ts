import Site from "@/models/site";

const sites: Record<string, Site> = {
  "Site 1": new Site("Site 1"),
  "Site 2": new Site("Site 2"),
  "Site 3": new Site("Site 3"),
  "Site 4": new Site("Site 4"),
  "Site 5": new Site("Site 5"),
  "Site 6": new Site("Site 6"),
}

const eventIcons: Record<string, string> = {
  "important": 'fa fa-exclamation',
  "ok": 'fa fa-thumbs-up',
  "info": 'fa fa-info-circle',
  "debug": 'fa fa-cog',
  "warning": 'fa fa-exclamation',
  "error": 'fa fa-exclamation-triangle',
  "edited": 'fas fa-edit',
  "created": 'fas fa-plus',
  "deleted": 'far fa-trash-alt',
}

const eventTypes = Object.keys(eventIcons);

export { sites, eventIcons, eventTypes };