---
name: Project Creation
description: Initialize GitHub project boards, issues, and milestones for Canvas LMS features
---

# Canvas LMS Project Creation Workflow

Automated setup for GitHub projects with standardized issue templates and project boards.

## Workflow Steps

### 1. Create GitHub Project Board
- Create a new GitHub Project (Board view)
- Name: `{ProjectName} - Development`
- Description: Auto-generated feature development board
- Status: Draft

### 2. Create Project Columns
Standard columns for the board:
- **Backlog** - Planned but not started
- **In Progress** - Currently being worked on
- **Review** - Awaiting code review or feedback
- **Done** - Completed items

### 3. Create Epic/Milestone
- Create GitHub Milestone for the feature
- Name: `{ProjectName} - v0.1.0`
- Description: Initial release of feature

### 4. Generate Issues from Template

#### Issue Templates for Canvas Study Stream

**Issue: Setup Development Environment**
```
Type: Setup
Priority: High
- [ ] Configure package.json and dependencies
- [ ] Setup TypeScript configuration
- [ ] Create component structure
- [ ] Setup build pipeline
```

**Issue: Implement MusicPlayer Component**
```
Type: Feature
Priority: High
Description: Build the main music player UI component
- [ ] Audio playback controls (play, pause, stop)
- [ ] Progress bar and time display
- [ ] Volume control
- [ ] Track information display
Acceptance Criteria:
- Component renders without errors
- All controls functional
- Styled and responsive
```

**Issue: Implement QuickLinksSelector Component**
```
Type: Feature
Priority: High
Description: Build quick links selector for music libraries
- [ ] Display quick link buttons
- [ ] Handle link clicks (open in new tab)
- [ ] Add/remove link functionality
- [ ] Persist links to localStorage
```

**Issue: Implement TaskbarWidget Integration**
```
Type: Feature
Priority: High
Description: Integrate widget into Canvas taskbar
- [ ] Expand/collapse widget
- [ ] Embed in Canvas footer/taskbar
- [ ] Handle responsive sizing
- [ ] Canvas styling compatibility
```

**Issue: Create useAudioPlayer Hook**
```
Type: Feature
Priority: High
Description: Custom React hook for audio management
- [ ] Play/pause/stop functionality
- [ ] Volume control
- [ ] Progress tracking
- [ ] Event handling
```

**Issue: Add TypeScript Type Definitions**
```
Type: Setup
Priority: Medium
Description: Define all TypeScript interfaces
- [ ] MusicTrack interface
- [ ] QuickLink interface
- [ ] PlayerState interface
- [ ] StudyStreamConfig interface
```

**Issue: Add Unit Tests**
```
Type: Testing
Priority: Medium
Description: Comprehensive test coverage
- [ ] useAudioPlayer tests
- [ ] Component tests (MusicPlayer, QuickLinksSelector)
- [ ] Integration tests
- [ ] Target 80%+ coverage
```

**Issue: Create Documentation**
```
Type: Documentation
Priority: Medium
Description: Setup and usage documentation
- [ ] README with getting started guide
- [ ] Component API documentation
- [ ] Contributing guidelines
- [ ] Deployment guide
```

**Issue: Setup Styling & CSS**
```
Type: Feature
Priority: Medium
Description: Component styling and theming
- [ ] Create CSS module for components
- [ ] Implement responsive design
- [ ] Add dark mode support
- [ ] Match Canvas LMS design system
```

**Issue: Setup Build & Release**
```
Type: Setup
Priority: Medium
Description: Prepare for production deployment
- [ ] Configure Vite build output
- [ ] Setup npm publish configuration
- [ ] Create release notes template
- [ ] Version management strategy
```

### 5. Assign Issues to Milestone
- All created issues assigned to the v0.1.0 milestone
- Set appropriate labels: `feature`, `bug`, `documentation`, `testing`

### 6. Configure Automation
- Enable auto-add issues to project board
- Set default status for new issues: **Backlog**

## Implementation Notes

- Issues should be created with clear acceptance criteria
- Each issue links to parent Epic/Milestone
- Use labels for easy filtering and categorization
- Setup GitHub workflows for automated testing on pull requests

## Success Criteria

- [ ] Project board created with all columns
- [ ] Minimum 10 issues generated
- [ ] All issues assigned to milestone
- [ ] Labels applied consistently
- [ ] Board accessible to team members
- [ ] Automation workflows active
