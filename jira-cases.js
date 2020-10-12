const dummyTickets = [
  {
    name: 'SCOPE-2863',
    title: 'Ability to add a pair (primary/redundant) for Local Power Circuits',
    // description: 'As Is process for Remote Power Circuits: In Scope > left menu -> add new asset -> add remote power circuit -Remote Power circuits can add a power circuit as a pair. (Snip attached) -On this form, if selected yes, then a "Primary power circuit details" and "Redundant power circuit details" sections will drop down. -On this form, if selected no, then only a "power circuit details" section will drop down.  *Enhancement desired for Local Power Circuits: * -In Scope> left menu -> add new asset -> create circuit pair  -Local power circuits should have this same pairing capability. There should be an option (like the one above) to pair a power circuit into primary/redundant sources.',
  },
  {
    name: 'DIGIME-137',
    title: 'updates to header and footer',
    // description: 'Remove header completely Footer should only be the bottom 2 lines of what is in the spec. The rest of the header and footer should not appear on any page.',
  },
  {
    name: 'SCOPE-2866',
    title: 'Ability to sever an existing Power Circuit Pair, resulting in two standalone Primary-type circuits',
    // description: "Andy Thomas requires the ability to sever an existing Power Circuit Pair relationship, resulting in two standalone 'Primary'-type circuits, so that he can individually repurpose circuits which were originally linked as a redundancy pair for use in other scenarios (such as one of the circuits from the pair being used as a supplemental, tertiary circuit for another circuit pair). This amounts to creating a button in the UI which performs the pair-severing behavior we recently scripted for several existing circuits as part of https://tgsupport.atlassian.net/browse/SCOPE-2776.",
  },
  {
    name: 'SCOPE-2868',
    title: 'Logic Monitor version reverting to V1',
    // description: 'Bug: As a MS user, when I update the logic monitor credentials the LM version gets set to v1, even if the dropdown shows v2. I need to change the dropdown to v1 then back to v2 for v2 to be saved.',
  },
  {
    name: 'DIGIME-141',
    title: 'Playlist management API & backend work',
    // description: 'As a CMS user, I need to be able to manage playlists for my company. I need to be able to update the playlist name, add jobs to a playlist, remove jobs to a playlist, and update the order of jobs in a playlist. I also need to be able to delete a playlist Need to create API routes and database changes to support this functionality'
  },
  {
    name: 'SCOPE-2829',
    title: 'Remove incomplete connections',
    // description: 'Create script to find all incomlete connections for switches and servers and remove them',
  },
  {
    name: 'INTERNAL-668',
    title: 'Standup & Sprint Planning',
    // description: 'Standup & Sprint Planning',
  },
  {
    name: 'INTERNAL-26',
    title: 'Internal - Time Tracking and Ticket clearing',
    // description: 'Internal - Time Tracking and Ticket clearing',
  },
]

module.exports = {
  dummyTickets,
};
